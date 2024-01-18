import AddEditUserForm from '@/components/admin/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'teachers';
  return <AddEditUserForm type={type} />;
}
