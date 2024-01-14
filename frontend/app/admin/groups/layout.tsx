import React, { FC } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { getCourses } from '@/utils/backend-route';
import { Course } from '@/components/Table';
import { Flex } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
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

  return (
    <>
      <Sidebar tabs={groupTabs} query="courseCode" />
      <Flex direction="column" p="5" w="90%" marginX="10" bg="#202020" borderRadius="8px" overflow="hidden">
        {children}
      </Flex>
    </>
  );
};

export default AdminLayout;
