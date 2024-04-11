'use client';

import {
  Agenda,
  EventSettingsModel,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import React, { FC } from 'react';
import { createISODate } from '@/utils/methods';

interface CalendarProps {
  lessons: any[];
}

const Calendar: FC<CalendarProps> = ({ lessons }) => {
  const eventSettings: EventSettingsModel = {
    dataSource: lessons?.map((lesson) => {
      return {
        Id: lesson.id,
        Subject: `${lesson?.module?.name}: ${lesson?.group?.name || ''}`,
        StartTime: createISODate(lesson.day, lesson.startTime),
        EndTime: createISODate(lesson.day, lesson.endTime),
        GroupId: lesson.group?.id,
        ModuleId: lesson.module?.id,
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
      showHeaderBar={false}
      timeScale={timeScale}
      rowAutoHeight={true}
      eventSettings={eventSettings}
      startHour="09:00"
      endHour="21:00"
      showQuickInfo={true}
      readonly={true}
      disabled={true}
    >
      <Inject services={[Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Calendar;
