import React, { FC } from 'react';
import { getModuleById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { Module } from '@/utils/interfaces';

interface PageProps {
  params: {
    id: string;
  };
}

const ModulePage: FC<PageProps> = async ({ params }) => {
  const currentModule: Module = await getModuleById(params.id);

  if (!currentModule?.id) return <CenteredText text="Admin not found" />;

  return (
    <div>
      <p>Id: {currentModule.id}</p>
      <p>Code: {currentModule.code}</p>
      <p>Name: {currentModule.name}</p>
      <p>Description: {currentModule.description}</p>
      <p>Course: {currentModule.course?.name}</p>
    </div>
  );
};

export default ModulePage;
