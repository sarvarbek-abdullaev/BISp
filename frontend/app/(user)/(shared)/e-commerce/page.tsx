import { getProducts } from '@/actions/handleGet.action';
import { Product } from '@prisma/client';
import ProductsContainer from '@/components/shared/products-container';
import PageContainer from '@/components/user/page-container';

const Page = async () => {
  const products: Product[] = await getProducts();

  return (
    <PageContainer title="Products Available:">
      <ProductsContainer products={products} />
    </PageContainer>
  );
};

export default Page;
