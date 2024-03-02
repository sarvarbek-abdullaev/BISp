import React from 'react';
import AddEditGroupForm from '@/components/admin/AddEditGroupForm';
import { getAcademicYears, getCourses } from '@/actions/handleGet.action';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';

export default async function Page() {
  const [courses, academicYears] = await Promise.all([getCourses(), getAcademicYears()]);
  return (
    <>
      <GroupSidebar />
      <Wrapper className="flex-1">
        <AddEditGroupForm data={{ courses, academicYears }} type="groups" />
      </Wrapper>
    </>
  );
}
