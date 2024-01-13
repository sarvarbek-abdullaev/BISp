import React, { FC } from 'react';
import { getUserById } from '@/utils/backend-route';
import AddEditForm from '@/components/AddEditForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'student';
  const user = await getUserById(type, params.id);
  return <AddEditForm user={user} type={type} />;
};

export default Page;
