import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthentication from '@modules/users/infra/middlewares/ensureAuthentication';

const appointmentsRouter = Router();

// By setting the middleware at this point and in this way, we are setting it to run in all routes
appointmentsRouter.use(ensureAuthentication);

/**
 * Appointments listing
 * GET http://base_url/appointments/
 */
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

/**
 * Appointment creation
 * POST http://base_url/appointments/
 */
appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
