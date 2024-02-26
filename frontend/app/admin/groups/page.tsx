import { Course, Table } from '@/components/admin/Table';
import { groupColumns } from '@/tabs';
import React from 'react';
import { getCourses, getGroups } from '@/actions/handleGet.action';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { Tab } from '@/utils/interfaces';
import { Button } from '@/components/ui/button';

export default async function GroupsPage({ searchParams }: any) {
  const { courseCode } = searchParams;

  let [groups, courses] = await Promise.all([getGroups(), getCourses()]);

  // @ts-ignore
  const allModulesLength = courses.reduce((acc: number, course: Course) => acc + course.modules.length, 0);

  if (courseCode !== 'all') {
    groups = groups.filter((group: any) => group?.course?.code === courseCode);
  }

  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];

  const groupTabs = courses.map((course: Course) => ({
    name: course.name,
    path: `/admin/groups?courseCode=${course.code}`,
  }));

  const Dashboard = () => {
    return (
      <div className="flex w-full h-full flex-col gap-4">
        <Wrapper>
          <div className="flex justify-end items-center gap-4">
            <Link href={'groups/create'}>
              <Button variant="ghost">Create Group</Button>
            </Link>
            <Link href={'groups/assign'}>
              <Button variant="ghost">Manage Groups Students</Button>
            </Link>
          </div>
        </Wrapper>
        <Wrapper flex="1">
          <div className="flex justify-end items-center gap-4 my-4">All modules: {allModulesLength}</div>
          <div className="grid grid-cols-3 gap-4">
            {groupTabs.map(({ path, name }: Tab, index: number) => {
              const courseModulesLength = courses.find((course: Course) => course.name === name)?.modules?.length;
              return (
                <CircularProgressBar
                  key={path + name + index}
                  text={courseModulesLength}
                  value={courseModulesLength}
                  maxValue={allModulesLength}
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

  return (
    <>
      <GroupSidebar />
      {courseCode ? (
        <Wrapper className="flex-1">
          <Table columns={groupColumns} rows={groups} type="groups" />
        </Wrapper>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
