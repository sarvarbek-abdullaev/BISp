import { Table } from '@/components/Table';
import { groupColumns } from '@/tabs';
import React from 'react';
import { getGroups } from '@/utils/backend-route';

export default async function GroupsPage({ searchParams }: any) {
  const { courseCode } = searchParams;
  if (!courseCode) return null;

  let groups = await getGroups();
  if (courseCode !== 'all') {
    groups = groups.filter((group: any) => group?.course?.code === courseCode);
  }
  return <Table columns={groupColumns} rows={groups} type="group" />;
}
