import React, { FC } from 'react';
import AddEditExamForm from '@/components/admin/AddEditExamForm';
import { getModules } from '@/actions/handleGet.action';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async () => {
  const type = 'exams';
  const modules = await getModules();

  return <AddEditExamForm type={type} modules={modules} />;
};

export default Page;
