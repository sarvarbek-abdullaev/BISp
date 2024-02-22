'use client';

import {
  Agenda,
  DragAndDrop,
  EventSettingsModel,
  Inject,
  Month,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import React, { FC } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { createLesson } from '@/actions/handleCreate.action';
import { createISODate, findByIdAndReturnName } from '@/utils/methods';
import { toast } from '@/components/ui/use-toast';
import { updateLessonById } from '@/actions/handleUpdate.action';

interface CalendarProps {
  groups: any[];
  modules: any[];
  lessons: any[];
}

const Calendar: FC<CalendarProps> = ({ lessons, modules, groups }) => {
  const eventSettings: EventSettingsModel = {
    dataSource: lessons?.map((lesson) => {
      return {
        Id: lesson.id,
        Subject: `${lesson.module.name}: ${lesson.group.name}`,
        StartTime: createISODate(lesson.day, lesson.startTime),
        EndTime: createISODate(lesson.day, lesson.endTime),
        GroupId: lesson.group.id,
        ModuleId: lesson.module.id,
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

  const onPopupOpen = (args: any) => {
    if (args.type === 'Editor') {
      let statusElement = args.element.querySelector('#EventType');
      if (statusElement) {
        statusElement.setAttribute('name', 'EventType');
      }
    }
  };
  const editorTemplate = (props: any) => {
    return props !== undefined ? (
      <table className="custom-event-editor">
        <tbody>
          <tr>
            <td className="e-textlabel">Group</td>
            <td colSpan={4}>
              <DropDownListComponent
                id="GroupId"
                placeholder="Choose group"
                data-name="GroupId"
                className="e-field"
                dataSource={groups.map((group) => {
                  return { text: group.name, id: group.id };
                })}
                fields={{ text: 'text', value: 'id' }}
                value={props.EventType || null}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Module</td>
            <td colSpan={4}>
              <DropDownListComponent
                id="ModuleId"
                placeholder="Choose module"
                data-name="ModuleId"
                className="e-field"
                dataSource={modules.map((module) => {
                  return { text: module.name, value: module.id };
                })}
                fields={{ text: 'text', value: 'value' }}
                value={props.EventType || null}
              >
                <ResourcesDirective>
                  <ResourceDirective field="ModuleId" title="Module" name="Modules" />
                </ResourcesDirective>
              </DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  };

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
      showQuickInfo={false}
      editorTemplate={editorTemplate.bind(this)}
      popupOpen={onPopupOpen.bind(this)}
      actionComplete={async (args: any) => {
        if (args.requestType === 'eventCreated') {
          const currentObj = args.data[0];

          const groupName = findByIdAndReturnName(groups, currentObj.GroupId);
          const moduleName = findByIdAndReturnName(modules, currentObj.ModuleId);

          args.addedRecords[0].Subject = `${moduleName}: ${groupName}`;

          const newData = {
            groupId: currentObj.GroupId,
            moduleId: currentObj.ModuleId,
            day: new Date(currentObj.StartTime).getDay(),
            startTime: new Date(currentObj.StartTime).getHours(),
            endTime: new Date(currentObj.EndTime).getHours(),
          };

          const resp = await createLesson(newData);

          if (resp.error || resp.statusCode === 500) {
            args.cancel = true;
            return toast({
              variant: 'destructive',
              title: resp.message || resp.message,
            });
          }
        } else if (args.requestType === 'eventChanged') {
          const currentObj = args.data[0];

          const resp = await updateLessonById(currentObj.Id, {
            groupId: currentObj.GroupId,
            moduleId: currentObj.ModuleId,
            day: new Date(currentObj.StartTime).getDay(),
            startTime: new Date(currentObj.StartTime).getHours(),
            endTime: new Date(currentObj.EndTime).getHours(),
          });

          if (resp.error || resp.statusCode === 500) {
            args.cancel = true;
            toast({
              variant: 'destructive',
              title: resp.message || resp.message,
            });
          }
        }
      }}
    >
      <Inject services={[Week, WorkWeek, Month, Agenda, DragAndDrop]} />
    </ScheduleComponent>
  );
};

export default Calendar;
