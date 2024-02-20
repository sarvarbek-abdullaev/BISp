'use client';

import { Product } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import ProductCard from '@/components/shared/product';

interface ProductsContainerProps {
  products: Product[];
}

export interface CartItem {
  id: string;
  quantity: string;
  selectedVariant: string;
}

export interface Cart {
  items: CartItem[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({ products }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    cart && setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="grid grid-cols-4 mx-auto gap-4">
      {products.map((product) => (
        <div key={product.id} className="justify-self-center w-full">
          <ProductCard product={product} setCart={setCart} cart={cart} />
        </div>
      ))}
    </div>
  );
};

export default ProductsContainer;
