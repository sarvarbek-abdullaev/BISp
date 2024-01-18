import { Course, Table } from '@/components/Table';
import { groupColumns } from '@/tabs';
import React from 'react';
import { getCourses, getGroups } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Button, Flex, Grid } from '@chakra-ui/react';
import { Wrapper } from '@/components/Wrapper';
import Link from '@/components/Link';
import { CircularProgressBar } from '@/components/CircularProgressBar';
import { Tab } from '@/utils/interfaces';

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
      <Flex width="100%" height="100%" flexDirection="column" gap="4">
        <Wrapper>
          <Flex justifyContent="flex-end" alignItems="center" gap="4">
            <Link href={'groups/create'}>
              <Button {...buttonStyle} _hover={selectedStyle}>
                Create Group
              </Button>
            </Link>
            <Link href={'groups/assign'}>
              <Button {...buttonStyle} _hover={selectedStyle}>
                Manage Groups Students
              </Button>
            </Link>
          </Flex>
        </Wrapper>
        <Wrapper flex="1">
          <Grid templateColumns="repeat(3, 1fr)" gap="10">
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
          </Grid>
        </Wrapper>
      </Flex>
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
