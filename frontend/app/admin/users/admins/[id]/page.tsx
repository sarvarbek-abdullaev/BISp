import React, { FC } from 'react';
import { getUserById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';

import { createDate } from '@/lib/utils';

interface PageProps {
  params: {
    id: string;
  };
}

interface Admin {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    role: string;
  };
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const type = 'admins';
  const admin: Admin = await getUserById(type, params.id);

  if (!admin?.id) return <CenteredText text="Admin not found" />;

  return (
    <div>
      <p>Id: {admin.id}</p>
      <p>FirstName: {admin.profile.firstName}</p>
      <p>LastName: {admin.profile.lastName}</p>
      <p>Email: {admin.profile.email}</p>
      <p>Birth Date: {createDate(admin.profile.birthDate)}</p>
      <p>Role: {admin.profile.role}</p>
    </div>
  );
};

export default AdminPage;
