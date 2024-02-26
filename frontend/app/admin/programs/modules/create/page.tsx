import React, { FC } from 'react';
import AddEditModuleForm from '@/components/admin/AddEditModuleForm';
import { getCourses, getUsers } from '@/actions/handleGet.action';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async () => {
  const type = 'modules';

  const [courses, teachers] = await Promise.all([getCourses(), getUsers('teachers')]);

  return <AddEditModuleForm courses={courses} teachers={teachers} type={type} />;
};

export default Page;
