import { getEvents } from '@/utils/backend-route';
import EventsCalendar from '@/components/shared/events-calendar';

export default async function Events() {
  const events = await getEvents();

  return <EventsCalendar events={events} />;
}
