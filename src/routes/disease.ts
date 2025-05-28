import { Hono } from 'hono'
import getAllDisease from '../controllers/disease/getAllDisease';

const disease = new Hono()

disease.get('/all', getAllDisease)

export default disease;