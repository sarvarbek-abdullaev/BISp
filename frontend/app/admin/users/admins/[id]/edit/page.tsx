import React, { FC } from 'react';
import { getUserById } from '@/actions/handleGet.action';
import AddEditUserForm from '@/components/admin/AddEditUserForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'admins';
  const user = await getUserById(type, params.id);
  return <AddEditUserForm user={user} type={type} modules={[]} />;
};

export default Page;
