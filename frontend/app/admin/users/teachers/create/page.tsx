import AddEditUserForm from '@/components/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'teachers';
  return <AddEditUserForm type={type} />;
}
