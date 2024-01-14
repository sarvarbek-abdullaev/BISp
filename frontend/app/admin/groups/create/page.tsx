import React from 'react';
import AddEditGroupForm from '@/components/AddEditGroupForm';
import { getCourses } from '@/utils/backend-route';

export default async function Page() {
  const courses = await getCourses();
  return <AddEditGroupForm data={{ courses }} type="group" />;
}
