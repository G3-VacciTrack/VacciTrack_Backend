import { Hono } from 'hono'
import createAppointment from '../controllers/appointment/createAppointment';
import editAppointment from '../controllers/appointment/editAppointment';
import deleteAppointment from '../controllers/appointment/deleteAppointment';
import getAppointment from '../controllers/appointment/getAppointment';
import getUpcomingAppointment from '../controllers/appointment/getUpcomingAppointment';

const appointment = new Hono()

appointment.get('/all', getAppointment);
appointment.post('/', createAppointment);
appointment.put('/:appointmentId', editAppointment);
appointment.delete('/:appointmentId', deleteAppointment);
appointment.get('/upcoming', getUpcomingAppointment);

export default appointment;