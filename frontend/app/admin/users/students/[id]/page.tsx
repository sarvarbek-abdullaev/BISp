import React, { FC } from 'react';
import { getUserById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { createDate } from '@/lib/utils';

interface StudentPageProps {
  params: {
    id: string;
  };
}

interface StudentGroup {
  id: string;
  group: {
    id: string;
    name: string;
  };
}

interface Student {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    role: string;
  };
  studentGroups: StudentGroup[];
  currentGroup: StudentGroup;
}

const StudentPage: FC<StudentPageProps> = async ({ params }) => {
  const type = 'students';
  const student: Student = await getUserById(type, params.id);

  if (!student?.id) return <CenteredText text="Student not found" />;

  return (
    <div>
      <p>Id: {student.id}</p>
      <p>FirstName: {student.profile.firstName}</p>
      <p>LastName: {student.profile.lastName}</p>
      <p>Email: {student.profile.email}</p>
      <p>Birth Date: {createDate(student.profile.birthDate)}</p>
      <p>Role: {student.profile.role}</p>
      <p>Current Group: {student.currentGroup?.group?.name}</p>
      <p>All groups: {student.studentGroups?.map((studentGroup) => studentGroup.group.name).join(', ')}</p>
    </div>
  );
};

export default StudentPage;
