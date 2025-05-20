import { Hono } from 'hono'
import postPersonalInfo from '../controllers/user/postPersonalInfo';
import newUserValidate from '../controllers/user/newUserValidate';

const user = new Hono()

user.post('/info',postPersonalInfo);
user.get('/validate', newUserValidate);

export default user;