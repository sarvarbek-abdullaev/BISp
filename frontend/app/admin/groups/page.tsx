import { Table } from '@/components/Table';
import { groupColumns } from '@/tabs';
import React from 'react';
import { getGroups } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Flex } from '@chakra-ui/react';

export default async function GroupsPage({ searchParams }: any) {
  const { courseCode } = searchParams;

  let groups = await getGroups();
  if (courseCode !== 'all') {
    groups = groups.filter((group: any) => group?.course?.code === courseCode);
  }

  return (
    <>
      <GroupSidebar />
      <Flex direction="column" p="5" w="90%" marginX="10" bg="#202020" borderRadius="8px" overflow="hidden">
        {courseCode && <Table columns={groupColumns} rows={groups} type="groups" />}
      </Flex>
    </>
  );
}
