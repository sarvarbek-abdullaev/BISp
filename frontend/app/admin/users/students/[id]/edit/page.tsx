import React, { FC } from 'react';
import { getUserById } from '@/utils/backend-route';
import AddEditUserForm from '@/components/AddEditUserForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'students';
  const user = await getUserById(type, params.id);
  return <AddEditUserForm user={user} type={type} />;
};

export default Page;
