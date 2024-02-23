import React, { FC } from 'react';
import { getEnrollmentsById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { Course } from '@/components/admin/Table';

interface PageProps {
  params: {
    id: string;
  };
}

interface Enrollment {
  id: number;
  student: any;
  course: Course;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminPage: FC<PageProps> = async ({ params }) => {
  const enrollment: Enrollment = await getEnrollmentsById(params.id);

  if (!enrollment?.id) return <CenteredText text="Enrollment not found" />;

  return (
    <div>
      <p>Id: {enrollment.id}</p>
      <p>Status: {enrollment.status}</p>
      <p>
        Student Name: {enrollment.student?.profile.firstName} {enrollment.student?.profile.lastName}
      </p>
      <p>Course: {enrollment.course?.name}</p>
    </div>
  );
};

export default AdminPage;
