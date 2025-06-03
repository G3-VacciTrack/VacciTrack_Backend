import { Hono } from 'hono'
import createHistory from '../controllers/history/createHistory';
import getHistory from '../controllers/history/getHistory';
import editHistory from '../controllers/history/editHistory';
import deleteHistory from '../controllers/history/deleteHistory';

const history = new Hono()

history.post('/', createHistory);
history.get('/all', getHistory);
history.put('/:historyId', editHistory);
history.delete('/:historyId', deleteHistory);

export default history;