import { Hono } from 'hono'
import createAppointment from '../controllers/appointment/createAppointment';
import editAppointment from '../controllers/appointment/editAppointment';
import deleteAppointment from '../controllers/appointment/deleteAppointment';

const appointment = new Hono()

appointment.post('/', createAppointment);
appointment.put('/:appointmentId', editAppointment);
appointment.delete('/:appointmentId', deleteAppointment);

export default appointment;