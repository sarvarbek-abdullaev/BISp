import React, { FC } from 'react';
import { getProductById } from '@/utils/backend-route';
import AddEditProductForm from '@/components/admin/add-edit-product-form';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const type = 'products';
  const product = await getProductById(params.id);
  return <AddEditProductForm product={product} type={type} />;
};

export default Page;
