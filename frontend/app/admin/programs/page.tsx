import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { adminProgramTabs } from '@/tabs';
import { Button } from '@/components/ui/button';
import { getCourses, getEvents, getExams, getModules } from '@/utils/backend-route';
import React from 'react';

const ProgramsPage = async () => {
  // courses, marks
  const courseModules = await Promise.all([getCourses(), getModules(), getExams(), getEvents()]);
  const [courses, modules, exams, events] = courseModules;
  const programTabs = adminProgramTabs.slice(1);
  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];

  return (
    <div className="flex w-full h-full flex-col gap-4">
      <Wrapper>
        <div className="flex justify-end items-center gap-4">
          {programTabs.map(({ path, name }, index) => (
            <Link key={name + path + index} href={path + '/create'}>
              <Button variant="ghost">Create {name.slice(0, name.length - 1)}</Button>
            </Link>
          ))}
        </div>
      </Wrapper>
      <Wrapper flex="1">
        <div className="flex justify-end items-center gap-4 my-4">
          <div>All modules: {modules.length}</div>
          <div className="h-full w-0.5 bg-[#313338]" />
          <div>All courses: {courses.length}</div>
          <div className="h-full w-0.5 bg-[#313338]" />
          <div>All exams: {exams.length}</div>
          <div className="h-full w-0.5 bg-[#313338]" />
          <div>All events: {events.length}</div>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {programTabs.map(({ path, name }, index) => {
            const currentArr = courseModules[index];
            const currentLength = currentArr.length;
            const currentActive = currentArr.filter((obj: any) => obj?.active !== 'ACTIVE').length;

            return (
              <CircularProgressBar
                key={path + name + index}
                text={currentActive}
                title={name === 'Exams' || name === 'Events' ? name : 'Active'}
                value={currentActive}
                maxValue={currentLength}
                color={colors[index]}
                path={path}
                name={name}
              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
};

export default ProgramsPage;
