import React, { FC } from 'react';
import { getCourseById, getCourses, getUserById } from '@/utils/backend-route';
import CenteredText from '@/components/CenteredText';
import { Course } from '@/utils/interfaces';

interface PageProps {
  params: {
    id: string;
  };
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const type = 'admins';
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
