import React, { FC } from 'react';
import { getOrderById } from '@/utils/backend-route';
import CenteredText from '@/components/shared/CenteredText';
import { Box } from '@chakra-ui/react';
import { createDate } from '@/lib/utils';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

const TeacherPage: FC<PageProps> = async ({ params }) => {
  const order: any = await getOrderById(params.id);

  if (!order?.id) return <CenteredText text="Teacher not found" />;
  const defaultImageSrc = 'https://placehold.jp/150x150.png';

  const { id, profile, subtotal, quantity, status, orderedProducts, createdAt } = order;
  return (
    <Box>
      <p>Id: {order.id}</p>
      <p>
        Full Name: {profile.firstName} {profile.lastName}
      </p>
      <p>Subtotal: {subtotal}</p>
      <p>Quantity: {quantity}</p>
      <p>Status: {order.status}</p>
      <p>Created at: {createDate(order.createdAt)}</p>
      <p>Ordered Products:</p>
      <ul>
        {orderedProducts.map((orderedProduct: any) => {
          const { product, quantity, selectedSize } = orderedProduct;
          return (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Size: {selectedSize}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {quantity}</p>
              <Image src={product.image || defaultImageSrc} width={50} height={50} alt={product.name} />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default TeacherPage;
