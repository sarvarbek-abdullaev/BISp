'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '@prisma/client';
import { FC } from 'react';

interface EventCalendarProps {
  events: Event[];
}

const localizer = momentLocalizer(moment);

const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const eventsFormatted = events.map((event, index) => ({
    id: event.id,
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resourceId: index + 1,
  }));

  return (
    <Calendar
      localizer={localizer}
      events={eventsFormatted}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};

export default EventCalendar;
