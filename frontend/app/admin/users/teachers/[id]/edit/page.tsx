import React, { FC } from 'react';
import { getModules, getUserById } from '@/actions/handleGet.action';
import AddEditUserForm from '@/components/admin/AddEditUserForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'teachers';

  const [user, modules] = await Promise.all([getUserById(type, params.id), getModules()]);
  return <AddEditUserForm user={user} modules={modules} type={type} />;
};

export default Page;
