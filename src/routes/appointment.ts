import { Hono } from 'hono'
import createAppointment from '../controllers/appointment/createAppointment';
import editAppointment from '../controllers/appointment/editAppointment';
import deleteAppointment from '../controllers/appointment/deleteAppointment';
import getAppointment from '../controllers/appointment/getAppointment';
import getAppointmentById from '../controllers/appointment/getAppointmentById';

const appointment = new Hono()

appointment.get('/all', getAppointment);
appointment.get('/:appointmentId', getAppointmentById);
appointment.post('/', createAppointment);
appointment.put('/:appointmentId', editAppointment);
appointment.delete('/:appointmentId', deleteAppointment);

export default appointment;