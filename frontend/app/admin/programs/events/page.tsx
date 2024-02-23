import { getEvents } from '@/actions/handleGet.action';
import { eventColumns } from '@/tabs';
import { EventTable } from '@/components/admin/event-table';

const CoursesPage = async () => {
  const events = await getEvents();

  return <EventTable columns={eventColumns} rows={events} type="events" />;
};

export default CoursesPage;
