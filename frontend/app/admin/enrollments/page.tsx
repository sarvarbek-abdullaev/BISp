import { Course, Table } from '@/components/admin/Table';
import { enrollmentColumns } from '@/tabs';
import React from 'react';
import { getCourses, getEnrollments } from '@/utils/backend-route';
import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { Tab } from '@/utils/interfaces';
import { Button } from '@/components/ui/button';
import EnrollmentSidebar from '@/app/admin/enrollments/enrollment-sidebar';

export default async function GroupsPage({ searchParams }: any) {
  const { courseCode } = searchParams;

  let [courses, enrollments] = await Promise.all([getCourses(), getEnrollments()]);

  const allEnrollmentsLength = enrollments.length;

  if (courseCode !== 'all') {
    enrollments = enrollments.filter((enrollment: any) => enrollment?.course?.code === courseCode);
  }

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

  const enrollmentsTabs = courses.map((course: Course) => ({
    name: course.name,
    path: `/admin/enrollments?courseCode=${course.code}`,
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
          <div className="flex justify-end items-center gap-4 my-4">All enrollments: {allEnrollmentsLength}</div>
          <div className="grid grid-cols-3 gap-4">
            {enrollmentsTabs.map(({ path, name, key }: Tab, index: number) => {
              const courseModulesLength = courses.find((course: Course) => course.name === name)?.enrollments?.length;

              return (
                <CircularProgressBar
                  key={key}
                  text={courseModulesLength}
                  value={courseModulesLength}
                  maxValue={allEnrollmentsLength}
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
      <EnrollmentSidebar />
      {courseCode ? (
        <Wrapper>
          <Table columns={enrollmentColumns} rows={enrollments} type="enrollments" />
        </Wrapper>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
