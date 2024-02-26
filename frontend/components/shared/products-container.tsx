'use client';

import { Product } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import ProductCard from '@/components/shared/product';
import { createOrderByStudent } from '@/actions/handleCreate.action';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Link from '@/components/shared/Link';
import GooglePaymentButton from '@/components/shared/google-payment-button';

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

  const handleOrderNow = async (paymentRequest: any) => {
    try {
      const data = {
        profileId: session?.user.profile.id,
        orderedProducts: cart.items,
        paymentDetails: {
          cardDetails: paymentRequest.paymentMethodData.info.cardDetails,
          cardNetwork: paymentRequest.paymentMethodData.info.cardNetwork,
        },
      };
      setOrderPlacing(true);

      const response = await createOrderByStudent(data);

      if (response) {
        setCart({ items: [] });
        toast({
          title: 'Order Placed',
          description: 'Your order has been placed successfully, you can check the status in your orders page',
          className: 'bg-gray-950',
          action: (
            <ToastAction altText="Orders Page" className="bg-gray-950">
              <Link href={`/orders`}>Go to Orders</Link>
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: 'Order Failed',
          description: 'Your order has failed, please try again later',
          className: 'bg-red-500',
          action: (
            <ToastAction altText="Try Again" onClick={handleOrderNow} className="hover:bg-gray-950 hover:text-white">
              Try Again
            </ToastAction>
          ),
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setOrderPlacing(false);
    }
  };

  const totalPrice = cart.items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + parseInt(item.quantity) * (product?.price || 0);
  }, 0);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="justify-self-center w-full">
            <ProductCard product={product} setCart={setCart} cart={cart} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end gap-4 mt-10">
        <h2 className="text-xl uppercase flex gap-2 mr-4">
          Total:
          <span className="font-bold">$ {totalPrice}</span>
        </h2>
        <button disabled={cart.items.length === 0} className="disabled:hover:bg-transparent">
          <GooglePaymentButton
            totalPrice={totalPrice.toString()}
            currencyCode="USD"
            onSuccessfulPayment={handleOrderNow}
          />
        </button>
        {/*<Button*/}
        {/*  disabled={cart.items.length === 0}*/}
        {/*  onClick={handleOrderNow}*/}
        {/*  variant="outline"*/}
        {/*  className="text-white font-bold py-6 px-8 md:px-16 text-lg border-black min-w-32 md:min-w-60 rounded-lg"*/}
        {/*>*/}
        {/*  */}
        {/*  /!*{orderPlacing ? <Loader2 className="animate-spin" size={24} /> : 'Order Now'}*!/*/}
        {/*</Button>*/}
      </div>
    </>
  );
};

export default ProductsContainer;
