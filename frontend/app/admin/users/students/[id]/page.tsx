import React, { FC } from 'react';
import { getUserById } from '@/utils/backend-route';
import CenteredText from '@/components/CenteredText';

interface StudentPageProps {
  params: {
    id: string;
  };
}

interface UserGroup {
  id: string;
  group: {
    id: string;
    name: string;
  };
}

interface Student {
  id: string;
  name: string;
  email: string;
  birthYear: number;
  role: string;
  userGroup: UserGroup[];
}

const StudentPage: FC<StudentPageProps> = async ({ params }) => {
  const type = 'students';
  const user: Student = await getUserById(type, params.id);

  if (!user?.id) return <CenteredText text="Student not found" />;

  return (
    <div>
      <p>Id: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Birth year: {user.birthYear}</p>
      <p>Role: {user.role}</p>
      <p>Group: {user.userGroup[0]?.group?.name}</p>
      <p>All groups: {user.userGroup.map((group) => group.group.name).join(', ')}</p>
    </div>
  );
};

export default StudentPage;
