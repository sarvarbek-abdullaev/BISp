import AddEditUserForm from '@/components/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'admin';
  return <AddEditUserForm type={type} />;
}
