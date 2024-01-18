import React from 'react';
import AddEditGroupForm from '@/components/admin/AddEditGroupForm';
import { getCourses } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';

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
