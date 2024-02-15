import { Sidebar } from '@/components/shared/Sidebar';
import React from 'react';
import { getCourses } from '@/utils/backend-route';
import { Course } from '@/components/admin/Table';

const EnrollmentSidebar = async () => {
  const courses = await getCourses();

  const enrollmentTabs = [
    {
      name: 'Dashboard',
      path: '/admin/enrollments',
    },
    {
      name: 'All',
      path: '/admin/enrollments?courseCode=all',
    },
  ];

  enrollmentTabs.push(
    ...courses.map((course: Course) => ({ name: course.name, path: `/admin/enrollments?courseCode=${course.code}` })),
  );

  return <Sidebar tabs={enrollmentTabs} query="courseCode" />;
};

export default EnrollmentSidebar;
