import { getAcademicYears, getCourses, getGroupById } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditGroupForm from '@/components/admin/AddEditGroupForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'groups';
  const [group, courses, academicYears] = await Promise.all([
    getGroupById(params.id),
    getCourses(),
    getAcademicYears(),
  ]);
  return <AddEditGroupForm data={{ group, courses, academicYears }} type={type} />;
};

export default Page;
