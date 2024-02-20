import { getProducts } from '@/utils/backend-route';
import { Product } from '@prisma/client';
import ProductsContainer from '@/components/shared/products-container';
const Page = async () => {
  const products: Product[] = await getProducts();

  return (
    <div>
      <h1>Products: </h1>
      <ProductsContainer products={products} />
    </div>
  );
};

export default Page;
