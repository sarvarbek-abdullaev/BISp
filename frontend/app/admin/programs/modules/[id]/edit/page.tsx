import { getCourses, getModuleById, getUsers } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditModuleForm from '@/components/admin/AddEditModuleForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'modules';
  const [currentModule, courses, teachers] = await Promise.all([
    getModuleById(params.id),
    getCourses(),
    getUsers('teachers'),
  ]);
  return <AddEditModuleForm module={currentModule} courses={courses} teachers={teachers} type={type} />;
};

export default Page;
