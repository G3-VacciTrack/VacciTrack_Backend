import { Hono } from 'hono'
import editPersonalInfo from '../controllers/user/editPersonalInfo';
import newUserValidate from '../controllers/user/newUserValidate';
import getPersonalInfo from '../controllers/user/getPersonalInfo';

const user = new Hono()

user.put('/info',editPersonalInfo);
user.get('/info', getPersonalInfo);
user.get('/validate', newUserValidate);

export default user;