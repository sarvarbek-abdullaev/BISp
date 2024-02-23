import { getExamById, getModules } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditExamForm from '@/components/admin/AddEditExamForm';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'exams';
  const [exam, modules] = await Promise.all([getExamById(params.id), getModules()]);
  return <AddEditExamForm type={type} modules={modules} exam={exam} />;
};

export default Page;
