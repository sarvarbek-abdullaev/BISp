import React, { FC } from 'react';
import AddEditModuleForm from '@/components/admin/AddEditModuleForm';
import { getCourses } from '@/actions/handleGet.action';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async () => {
  const type = 'modules';
  const courses = await getCourses();
  return <AddEditModuleForm courses={courses} type={type} />;
};

export default Page;
