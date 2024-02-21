'use client';

import { Product } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import ProductCard from '@/components/shared/product';
import { Button } from '@/components/ui/button';
import { createOrderByStudent } from '@/actions/handleCreate.action';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ProductsContainerProps {
  products: Product[];
}

export interface CartItem {
  productId: string;
  quantity: string;
  selectedSize: string;
}

export interface Cart {
  items: CartItem[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({ products }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [orderPlacing, setOrderPlacing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    cart && setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleOrderNow = async () => {
    try {
      const data = {
        profileId: session?.user.profile.id,
        orderedProducts: cart.items,
      };
      setOrderPlacing(true);

      const response = await createOrderByStudent(data);

      if (response) {
        setCart({ items: [] });
        toast({
          title: 'Order Placed',
          description: 'Your order has been placed successfully, you can check the status in your orders page',
          duration: 5000,
          className: 'bg-gray-950',
        });
      } else {
        toast({
          title: 'Order Failed',
          description: 'Your order has failed, please try again later',
          duration: 5000,
          className: 'bg-red-500',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setOrderPlacing(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="justify-self-center w-full">
            <ProductCard product={product} setCart={setCart} cart={cart} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end gap-4 mt-10">
        <h2 className="text-xl uppercase flex gap-2 mr-4">
          Total:
          <span className="font-bold">
            $
            {cart.items.reduce((acc, item) => {
              const product = products.find((p) => p.id === item.productId);
              console.log(product);
              return acc + parseInt(item.quantity) * (product?.price || 0);
            }, 0)}
          </span>
        </h2>
        <Button
          disabled={cart.items.length === 0}
          onClick={handleOrderNow}
          variant="outline"
          className="text-white font-bold py-6 px-16 text-lg rounded border-black min-w-60"
        >
          {orderPlacing ? <Loader2 className="animate-spin" size={24} /> : 'Order Now'}
        </Button>
      </div>
    </>
  );
};

export default ProductsContainer;
