import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('Appointment creation', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'provider-id-1',
      client_id: 'client-id-1',
    });

    expect(appointment).toHaveProperty('id');
  });

  /**
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  it('should NOT be able to create two appointments at the same date and time', async () => {
    await createAppointment.execute({
      date: new Date(2020, 4, 9, 11, 15),
      provider_id: 'provider-id-1',
      client_id: 'client-id-1',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 11, 20),
        provider_id: 'provider-id-1',
        client_id: 'client-id-2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
