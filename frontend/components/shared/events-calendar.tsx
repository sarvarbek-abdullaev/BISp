'use client';

import {
  Agenda,
  Day,
  EventSettingsModel,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import React, { FC } from 'react';

interface EventsCalendarProps {
  events: any[];
}

const EventsCalendar: FC<EventsCalendarProps> = ({ events }) => {
  const eventSettings: EventSettingsModel = {
    dataSource: events?.map((event) => {
      return {
        Id: event.id,
        Subject: event.name,
        StartTime: new Date(event.startDate).toISOString(),
        EndTime: new Date(event.endDate).toISOString(),
      };
    }),
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    },
  };

  const workingDays = [1, 2, 3, 4, 5, 6];
  const workHours = {
    highlight: true,
    start: '09:00',
    end: '21:00',
  };
  const timeScale = { enable: true, interval: 60, slotCount: 1 };

  return (
    <ScheduleComponent
      height="550px"
      showTimeIndicator={true}
      showWeekend={false}
      firstDayOfWeek={1}
      workDays={workingDays}
      workHours={workHours}
      selectedDate={new Date()}
      showWeekNumber={false}
      timeScale={timeScale}
      rowAutoHeight={true}
      eventSettings={eventSettings}
      startHour="09:00"
      endHour="21:00"
      showQuickInfo={false}
      readonly={true}
    >
      <Inject services={[Week, WorkWeek, Month, Agenda, Day]} />
    </ScheduleComponent>
  );
};

export default EventsCalendar;
