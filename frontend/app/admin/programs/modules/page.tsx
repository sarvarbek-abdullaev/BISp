import { getModules } from '@/actions/handleGet.action';
import { Table } from '@/components/admin/Table';
import { moduleColumns } from '@/tabs';

const ModulesPage = async () => {
  const modules = await getModules();

  return <Table columns={moduleColumns} rows={modules} type="modules" />;
};

export default ModulesPage;
