import React from 'react';
import AddEditOrderForm from '@/components/admin/add-edit-order-form';
import { getProducts, getUsers } from '@/actions/handleGet.action';

export default async function Page() {
  const type = 'orders';
  const [students, teachers, admins, products] = await Promise.all([
    getUsers('students'),
    getUsers('teachers'),
    getUsers('admins'),
    getProducts(),
  ]);

  const profiles = Array.from(new Set([...students, ...teachers, ...admins].map(({ profile }) => profile))).map(
    ({ firstName, lastName, id }) => ({ firstName, lastName, id }),
  );

  return <AddEditOrderForm type={type} profiles={profiles} products={products} />;
}
