import { getCourses, getGroupById } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditGroupForm from '@/components/admin/AddEditGroupForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'groups';
  const [group, courses] = await Promise.all([getGroupById(params.id), getCourses()]);
  return <AddEditGroupForm data={{ group, courses }} type={type} />;
};

export default Page;
