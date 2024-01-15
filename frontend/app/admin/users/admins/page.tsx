import { Table } from '@/components/Table';
import { columns } from '@/tabs';
import { getUsers } from '@/utils/backend-route';

const AdminsPage = async () => {
  const type = 'admins';
  const admins = await getUsers(type);
  return <Table rows={admins} columns={columns} type={type} />;
};

export default AdminsPage;
