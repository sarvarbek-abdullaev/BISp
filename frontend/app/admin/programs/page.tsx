import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { adminProgramTabs, adminUsersTabs } from '@/tabs';
import { Button } from '@/components/ui/button';
import { getCourses, getModules } from '@/utils/backend-route';
import React from 'react';

const ProgramsPage = async () => {
  // courses, modules
  const courseModules = await Promise.all([getCourses(), getModules()]);
  const [courses, modules] = courseModules;
  const programTabs = adminProgramTabs.slice(1);
  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];

  const buttonStyle = {
    border: '1px solid transparent',
    bg: 'blackAlpha.800',
    colorScheme: 'none',
  };

  const selectedStyle = {
    color: 'white',
    background: 'rgba(45, 45, 45, 0.7)',
    border: '1px solid black',
  };

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
        </div>
        <div className="grid grid-cols-3 gap-10">
          {programTabs.map(({ path, name }, index) => {
            const currentArr = courseModules[index];
            console.log({ currentArr });
            const currentLength = currentArr.length;
            const currentActive = currentArr.filter((obj: any) => obj?.active !== 'ACTIVE').length;

            return (
              <CircularProgressBar
                key={path + name + index}
                text={currentActive}
                title="Active"
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
