import { Table } from '@/components/Table';
import { columns } from '@/tabs';
import { getUsers } from '@/utils/backend-route';

const TeachersPage = async () => {
  const type = 'teacher';
  const teachers = await getUsers(type);
  return <Table rows={teachers} columns={columns} type={type} />;
};

export default TeachersPage;
