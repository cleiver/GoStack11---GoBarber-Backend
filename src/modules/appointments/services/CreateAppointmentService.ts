/**
 * Service classes execute one and only one business logic action
 */

import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  // typescript hack to automatically create an private property with this name and type
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    client_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      client_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
