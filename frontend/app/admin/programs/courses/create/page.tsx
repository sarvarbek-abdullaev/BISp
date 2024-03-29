import React, { FC } from 'react';
import AddEditCourseForm from '@/components/admin/AddEditCourseForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async () => {
  const type = 'courses';
  return <AddEditCourseForm type={type} />;
};

export default Page;
