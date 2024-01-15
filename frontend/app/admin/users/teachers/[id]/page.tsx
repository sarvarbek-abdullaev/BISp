import React, { FC } from 'react';
import { getUserById } from '@/utils/backend-route';
import CenteredText from '@/components/CenteredText';
import { Box } from '@chakra-ui/react';

interface PageProps {
  params: {
    id: string;
  };
}

interface Teacher {
  id: string;
  name: string;
  birthYear: number;
  email: string;
  role: string;
}

const TeaacherPage: FC<PageProps> = async ({ params }) => {
  const type = 'teachers';
  const teacher: Teacher = await getUserById(type, params.id);

  if (!teacher?.id) return <CenteredText text="Teacher not found" />;

  return (
    <Box>
      <p>Teacher: {teacher.id}</p>
      <p>Name: {teacher.name}</p>
      <p>Email: {teacher.email}</p>
      <p>Birth year: {teacher.birthYear}</p>
      <p>Role: {teacher.role}</p>
    </Box>
  );
};

export default TeaacherPage;
