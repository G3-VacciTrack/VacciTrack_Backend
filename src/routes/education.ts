import { Hono } from 'hono'
import getVaccineEducation from '../controllers/education/getVaccineEducation';

const education = new Hono()

education.get('/all', getVaccineEducation)

export default education;