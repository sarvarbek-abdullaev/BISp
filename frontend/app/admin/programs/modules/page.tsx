import { getModules, getUsers } from '@/utils/backend-route';
import { Table } from '@/components/admin/Table';
import { moduleColumns } from '@/tabs';

const ModulesPage = async () => {
  const modules = await getModules();

  return <Table columns={moduleColumns} rows={modules} type="modules" />;
};

export default ModulesPage;
