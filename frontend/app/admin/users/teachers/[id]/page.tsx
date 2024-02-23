import React, { FC } from 'react';
import { getUserById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { Box } from '@chakra-ui/react';
import { createDate } from '@/lib/utils';

interface PageProps {
  params: {
    id: string;
  };
}

interface Teacher {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    role: string;
  };
  modules: {
    id: string;
    name: string;
  }[];
}

const TeaacherPage: FC<PageProps> = async ({ params }) => {
  const type = 'teachers';
  const teacher: Teacher = await getUserById(type, params.id);

  if (!teacher?.id) return <CenteredText text="Teacher not found" />;

  return (
    <Box>
      <p>Id: {teacher.id}</p>
      <p>FirstName: {teacher.profile.firstName}</p>
      <p>LastName: {teacher.profile.lastName}</p>
      <p>Email: {teacher.profile.email}</p>
      <p>Birth Date: {createDate(teacher.profile.birthDate)}</p>
      <p>Role: {teacher.profile.role}</p>
      <p>Modules: {teacher.modules?.map((module) => module.name).join(', ')}</p>
    </Box>
  );
};

export default TeaacherPage;
