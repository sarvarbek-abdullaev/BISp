import React, { FC } from 'react';
import { getCourseById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { Course } from '@/utils/interfaces';

interface PageProps {
  params: {
    id: string;
  };
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const course: Course = await getCourseById(params.id);

  if (!course?.id) return <CenteredText text="Admin not found" />;

  return (
    <div>
      <p>Id: {course.id}</p>
      <p>Code: {course.code}</p>
      <p>Name: {course.name}</p>
      <p>Description: {course.description}</p>
      <p>Modules: {course.modules?.map((module) => module.name).join(' ,')}</p>
    </div>
  );
};

export default AdminPage;
