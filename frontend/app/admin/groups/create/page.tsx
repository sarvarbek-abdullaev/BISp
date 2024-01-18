import React from 'react';
import AddEditGroupForm from '@/components/AddEditGroupForm';
import { getCourses } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/Wrapper';

export default async function Page() {
  const courses = await getCourses();
  return (
    <>
      <GroupSidebar />
      <Wrapper>
        <AddEditGroupForm data={{ courses }} type="groups" />
      </Wrapper>
    </>
  );
}
