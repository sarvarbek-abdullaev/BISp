import { Course, Table } from '@/components/admin/Table';
import { enrollmentColumns } from '@/tabs';
import React from 'react';
import { getCourses, getEnrollments } from '@/actions/handleGet.action';
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

  const enrollmentsTabs = courses.map((course: Course) => ({
    name: course.name,
    path: `/admin/enrollments?courseCode=${course.code}`,
  }));

  const Dashboard = () => {
    return (
      <div className="flex w-full h-full flex-col gap-4">
        <Wrapper>
          <div className="flex justify-end items-center gap-4">
            <Link href={'enrollments/create'}>
              <Button variant="ghost">Create Enrollment</Button>
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
