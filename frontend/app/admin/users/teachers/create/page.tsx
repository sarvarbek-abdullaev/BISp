import AddEditUserForm from '@/components/admin/AddEditUserForm';
import React from 'react';
import { getModules } from '@/actions/handleGet.action';

export default async function Page() {
  const type = 'teachers';
  const modules = await getModules();
  return <AddEditUserForm type={type} modules={modules} />;
}
