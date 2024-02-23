import { getEventById, getModules } from '@/actions/handleGet.action';
import React, { FC } from 'react';
import AddEditEventForm from '@/components/admin/add-edit-event-form';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'events';
  const [modules, event] = await Promise.all([getModules(), getEventById(params.id)]);

  return <AddEditEventForm event={event} modules={modules} type={type} />;
};

export default Page;
