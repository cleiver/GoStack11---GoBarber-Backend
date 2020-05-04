/**
 * `typeorm` provides an default repository with commom methods.
 * But as we have an interface describing all the methods we need, we
 * code it bellow
 */

import { Repository, getRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const FindAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return FindAppointment;
  }
}

export default AppointmentsRepository;
