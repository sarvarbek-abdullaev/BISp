import React from 'react';
import AddEditProductForm from '@/components/admin/add-edit-product-form';

export default function Page() {
  const type = 'products';
  return <AddEditProductForm type={type} />;
}
