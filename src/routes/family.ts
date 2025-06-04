import { Hono } from 'hono'
import getAllMembers from '../controllers/family/getAllMembers'
import createMember from '../controllers/family/createMember';
import editMemberDetail from '../controllers/family/editMemberDetail';
import deleteMember from '../controllers/family/deleteMember';
import getAllMembersName from '../controllers/family/getAllMemberName';

const family = new Hono()

family.get('names', getAllMembersName);
family.get('all', getAllMembers);
family.post('create', createMember);
family.put('update/:memberId', editMemberDetail);
family.delete('delete/:memberId', deleteMember);

export default family;