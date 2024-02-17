import React, { FC } from 'react';
import { getExamById } from '@/utils/backend-route';
import CenteredText from '@/components/shared/CenteredText';
import { Module } from '@/utils/interfaces';

interface PageProps {
  params: {
    id: string;
  };
}

interface Exam {
  id: string;
  name: string;
  moduleId: string;
  module?: Module;
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const exam: Exam = await getExamById(params.id);

  if (!exam?.id) return <CenteredText text="Exam not found" />;

  return (
    <div>
      <p>Id: {exam.id}</p>
      <p>Name: {exam.name}</p>
      <p>Module: {exam.module?.name}</p>
    </div>
  );
};

export default AdminPage;
