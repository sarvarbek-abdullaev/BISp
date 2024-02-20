import { getEvents } from '@/utils/backend-route';
import EventCalendar from '@/components/shared/event-calendar';

export default async function Events() {
  const events = await getEvents();

  return <EventCalendar events={events} />;
}
