import React, { FC } from 'react';
import AddEditModuleForm from '@/components/AddEditModuleForm';
import { getCourses, getModuleById } from '@/utils/backend-route';

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
