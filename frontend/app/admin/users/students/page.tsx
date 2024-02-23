import { Table } from '@/components/admin/Table';
import { studentColumns } from '@/tabs';
import { getUsers } from '@/actions/handleGet.action';

const StudentsPage = async () => {
  const type = 'students';
  const students = await getUsers(type);

  return <Table rows={students} columns={studentColumns} type={type} />;
};

export default StudentsPage;
