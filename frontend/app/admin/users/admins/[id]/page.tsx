import React, { FC } from 'react';
import { getUserById } from '@/utils/backend-route';
import CenteredText from '@/components/shared/CenteredText';

interface PageProps {
  params: {
    id: string;
  };
}

interface Student {
  id: string;
  name: string;
  email: string;
  birthYear: number;
  role: string;
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const type = 'admins';
  const user = await getUserById(type, params.id);

  if (!user?.id) return <CenteredText text="Admin not found" />;

  return (
    <div>
      <p>Id: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Birth year: {user.birthYear}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default AdminPage;
