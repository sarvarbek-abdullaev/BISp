import { getEvents } from '@/utils/backend-route';
import { eventColumns } from '@/tabs';
import { EventTable } from '@/components/admin/event-table';

const CoursesPage = async () => {
  const events = await getEvents();

  return <EventTable columns={eventColumns} rows={events} type="events" />;
};

export default CoursesPage;
