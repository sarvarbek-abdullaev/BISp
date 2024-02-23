import { Table } from '@/components/admin/Table';
import { columns } from '@/tabs';
import { getUsers } from '@/actions/handleGet.action';

const TeachersPage = async () => {
  const type = 'teachers';
  const teachers = await getUsers(type);
  return <Table rows={teachers} columns={columns} type={type} />;
};

export default TeachersPage;
