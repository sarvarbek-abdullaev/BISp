'use client';

import { Product } from '@prisma/client';
import React, { FC } from 'react';
import { Cart, CartItem } from '@/components/shared/products-container';
import { LucideShoppingCart, MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductCardProps {
  product: Product;
  setCart: (cart: Cart) => void;
  cart: Cart;
}

const ProductCard: FC<ProductCardProps> = ({ product, cart, setCart }) => {
  const defaultVariant = product.variants[0];
  const productIndex = cart.items.findIndex((item) => item.productId === product.id);
  const alreadyInCart = productIndex !== -1;

  const [variant, setVariant] = React.useState<typeof defaultVariant>(defaultVariant);

  if (!product) return null;

  const onClick = () => {
    if (alreadyInCart) {
      handleUpdateQuantity(productIndex, 1);
    } else {
      const updatedCart: CartItem[] = [...cart.items, { productId: product.id, quantity: '1', selectedSize: variant }];
      setCart({ items: updatedCart });
    }
  };

  const handleUpdateQuantity = (index: number, amount: number) => {
    const updatedCart = [...cart.items];
    updatedCart[index] = {
      ...updatedCart[index],
      quantity: (parseInt(updatedCart[index].quantity) + amount).toString(),
    };

    if (parseInt(updatedCart[index].quantity) === 0) {
      updatedCart.splice(index, 1);
    }

    setCart({ items: updatedCart });
  };

  return (
    <div className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        {/* @ts-ignore */}
        <Image src={product.image} alt="product image" layout="fill" objectFit="cover" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
            {/*<span className="text-sm text-slate-900 line-through">$699</span>*/}
          </p>
        </div>
        <Select onValueChange={(value: typeof defaultVariant) => setVariant(value)} defaultValue={variant}>
          <SelectTrigger disabled={product.variants.length <= 1}>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            {product.variants.map((variant, id) => {
              return (
                <SelectItem key={id} value={variant}>
                  {variant}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <div className="border-t border-gray-200 my-4" />
        <div className="flex w-full items-center justify-center min-h-12 rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          {alreadyInCart ? (
            <div className="flex justify-between w-full mx-3">
              <span className="mr-1 focus:outline-none" onClick={() => handleUpdateQuantity(productIndex, -1)}>
                <MinusIcon size="20px" className="cursor-pointer" />
              </span>
              <span className="mr-1">{cart.items[productIndex].quantity}</span>
              <span className="focus:outline-none" onClick={() => handleUpdateQuantity(productIndex, 1)}>
                <PlusIcon size="20px" className="cursor-pointer" />
              </span>
            </div>
          ) : (
            <span
              onClick={!alreadyInCart ? onClick : undefined}
              className="flex items-center justify-center cursor-pointer w-full"
            >
              <LucideShoppingCart size="20px" className="mr-2" />
              Add to cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
