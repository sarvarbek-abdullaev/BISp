import { getCourses, getModuleById } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditModuleForm from '@/components/admin/AddEditModuleForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'modules';
  const [currentModule, courses] = await Promise.all([getModuleById(params.id), getCourses()]);
  return <AddEditModuleForm module={currentModule} courses={courses} type={type} />;
};

export default Page;
