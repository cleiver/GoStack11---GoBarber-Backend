/**
 * `typeorm` provides an default repository with commom methods.
 * We build one ourselves when we want specific methods.
 */

import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const FindAppointment = await this.findOne({
      where: { date },
    });

    return FindAppointment || null;
  }
}

export default AppointmentsRepository;
