import React, { FC } from 'react';
import { getEventById } from '@/utils/backend-route';
import CenteredText from '@/components/shared/CenteredText';
import { createDateTime } from '@/lib/utils';

interface PageProps {
  params: {
    id: string;
  };
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const event: any = await getEventById(params.id);

  if (!event?.id) return <CenteredText text="Event not found" />;

  return (
    <div>
      <p>Id: {event.id}</p>
      <p>Name: {event.name}</p>
      <p>Description: {event.description}</p>
      <p>Related Module: {event.module?.name}</p>
      <p>Start Date: {createDateTime(event.startDate)}</p>
      <p>End Date: {createDateTime(event.endDate)}</p>
      <p>Created At: {createDateTime(event.createdAt)}</p>
    </div>
  );
};

export default AdminPage;
