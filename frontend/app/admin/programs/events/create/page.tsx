import React, { FC } from 'react';
import AddEditEventForm from '@/components/admin/add-edit-event-form';
import { getModules } from '@/actions/handleGet.action';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async () => {
  const type = 'events';
  const modules = await getModules();
  return <AddEditEventForm type={type} modules={modules} />;
};

export default Page;
