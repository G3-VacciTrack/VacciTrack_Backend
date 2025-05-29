import { Hono } from 'hono'
import editPersonalInfo from '../controllers/user/editPersonalInfo';
import newUserValidate from '../controllers/user/newUserValidate';
import getPersonalInfo from '../controllers/user/getPersonalInfo';
import getUserName from '../controllers/user/getUserName';

const user = new Hono()

user.get('/name', getUserName);
user.put('/info',editPersonalInfo);
user.get('/info', getPersonalInfo);
user.get('/validate', newUserValidate);

export default user;