import React, { FC } from 'react';
import { getGroupById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { Course, User } from '@/components/admin/Table';

interface PageProps {
  params: {
    id: string;
  };
}

interface Group {
  id: number;
  name: string;
  year: number;
  course: Course;
  createdAt: string;
  updatedAt: string;
  userGroup?: User[];
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const group: Group = await getGroupById(params.id);

  console.log(group);

  if (!group?.id) return <CenteredText text="Group not found" />;

  return (
    <div>
      <p>Id: {group.id}</p>
      <p>Name: {group.name}</p>
      <p>Course: {group.course?.name}</p>
      <p>Birth year: {group.year}</p>
      <p>users: {group.userGroup?.length}</p>
    </div>
  );
};

export default AdminPage;
