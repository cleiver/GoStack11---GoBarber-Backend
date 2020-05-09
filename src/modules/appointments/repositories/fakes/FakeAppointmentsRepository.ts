/**
 * This repository is similar to the original one in `infra/typeorm/repositories`
 * but makes no real connection to the database
 */

import { uuid } from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual } from 'date-fns';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    // one liner:
    // Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment);

    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }
}
