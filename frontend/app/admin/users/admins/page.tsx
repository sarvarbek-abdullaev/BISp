import { Table } from '@/components/admin/Table';
import { columns } from '@/tabs';
import { getUsers } from '@/actions/handleGet.action';

const AdminsPage = async () => {
  const type = 'admins';
  const admins = await getUsers(type);
  return <Table rows={admins} columns={columns} type={type} />;
};

export default AdminsPage;
