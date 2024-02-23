import { getCourseById } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditCourseForm from '@/components/admin/AddEditCourseForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'courses';
  const course = await getCourseById(params.id);
  return <AddEditCourseForm course={course} type={type} />;
};

export default Page;
