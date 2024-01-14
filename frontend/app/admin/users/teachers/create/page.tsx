import AddEditUserForm from '@/components/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'teacher';
  return <AddEditUserForm type={type} />;
}
