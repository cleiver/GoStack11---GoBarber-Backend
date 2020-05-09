import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Appointment creation', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create two appointments at the same date and time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointment.execute({
      date: new Date(2020, 4, 9, 11, 15),
      provider_id: '123123123',
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 11, 20),
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
