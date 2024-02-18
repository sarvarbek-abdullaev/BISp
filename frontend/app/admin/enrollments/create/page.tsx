import React from 'react';
import { getCourses, getUsers } from '@/utils/backend-route';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';
import AddEditEnrollmentForm from '@/components/admin/add-edit-enrollment-form';

export default async function Page() {
  const [students, courses] = await Promise.all([getUsers('students'), getCourses()]);
  return (
    <>
      <GroupSidebar />
      <Wrapper>
        <AddEditEnrollmentForm students={students} courses={courses} type="enrollments" />
      </Wrapper>
    </>
  );
}
