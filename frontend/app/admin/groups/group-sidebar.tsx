import { Sidebar } from '@/components/shared/Sidebar';
import React from 'react';
import { getCourses } from '@/utils/backend-route';
import { Course } from '@/components/admin/Table';

const GroupSidebar = async () => {
  const courses = await getCourses();

  const groupTabs = [
    {
      name: 'Dashboard',
      path: '/admin/groups',
    },
    {
      name: 'All',
      path: '/admin/groups?courseCode=all',
    },
  ];

  groupTabs.push(
    ...courses.map((course: Course) => ({ name: course.name, path: `/admin/groups?courseCode=${course.code}` })),
  );

  return <Sidebar tabs={groupTabs} query="courseCode" />;
};

export default GroupSidebar;
