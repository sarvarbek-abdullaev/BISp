import { getEvents } from '@/actions/handleGet.action';
import EventsCalendar from '@/components/shared/events-calendar';
import PageContainer from '@/components/user/page-container';

export default async function Events() {
  const events = await getEvents();

  return (
    <PageContainer title="Events:">
      <EventsCalendar events={events} />
    </PageContainer>
  );
}
