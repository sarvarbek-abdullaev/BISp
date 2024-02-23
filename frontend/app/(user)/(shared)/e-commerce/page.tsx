import { getProducts } from '@/actions/handleGet.action';
import { Product } from '@prisma/client';
import ProductsContainer from '@/components/shared/products-container';

const Page = async () => {
  const products: Product[] = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-mono mb-10">Products Available:</h1>
      <ProductsContainer products={products} />
    </div>
  );
};

export default Page;
