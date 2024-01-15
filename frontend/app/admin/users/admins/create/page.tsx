import AddEditUserForm from '@/components/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'admins';
  return <AddEditUserForm type={type} />;
}
