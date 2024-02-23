import { getEvents } from '@/actions/handleGet.action';
import EventsCalendar from '@/components/shared/events-calendar';

export default async function Events() {
  const events = await getEvents();

  return <EventsCalendar events={events} />;
}
