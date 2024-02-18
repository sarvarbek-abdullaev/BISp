import React, { FC } from 'react';
import { getProductById, getUserById } from '@/utils/backend-route';
import CenteredText from '@/components/shared/CenteredText';
import { Box } from '@chakra-ui/react';
import { createDate } from '@/lib/utils';
import { Product } from '@/components/admin/product-table';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

const TeaacherPage: FC<PageProps> = async ({ params }) => {
  const product: Product = await getProductById(params.id);

  if (!product?.id) return <CenteredText text="Teacher not found" />;
  const imageSrc = product.image || 'https://placehold.jp/150x150.png';
  return (
    <Box>
      <p>Id: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Status: {product.status}</p>
      <p>Image:</p>
      <Image src={imageSrc} width={200} height={200} alt={product.name} />
      <p>Created at: {createDate(product.createdAt)}</p>
    </Box>
  );
};

export default TeaacherPage;
