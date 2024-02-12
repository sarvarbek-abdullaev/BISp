import { Course, Table } from '@/components/admin/Table';
import { groupColumns } from '@/tabs';
import React from 'react';
import { getCourses, getGroups } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { Tab } from '@/utils/interfaces';
import { Button } from '@/components/ui/button';

export default async function GroupsPage({ searchParams }: any) {
  const { courseCode } = searchParams;

  let [groups, courses] = await Promise.all([getGroups(), getCourses()]);

  if (courseCode !== 'all') {
    groups = groups.filter((group: any) => group?.course?.code === courseCode);
  }

  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];
  const value = Math.random() * 40;

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
          <div className="grid grid-cols-3 gap-10">
            {groupTabs.map(({ path, name }: Tab, index: number) => (
              <CircularProgressBar
                key={path + name + index}
                text="10"
                value={value}
                maxValue={value * 3}
                color={colors[index]}
                path={path}
                name={name}
              />
            ))}
          </div>
        </Wrapper>
      </div>
    );
  };

  return (
    <>
      <GroupSidebar />
      {courseCode ? (
        <Wrapper>
          <Table columns={groupColumns} rows={groups} type="groups" />
        </Wrapper>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
