import AddEditUserForm from '@/components/admin/AddEditUserForm';
import React from 'react';

export default function Page() {
  const type = 'admins';
  return <AddEditUserForm type={type} />;
}
