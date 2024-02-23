import { productColumns } from '@/tabs';
import { getProducts } from '@/actions/handleGet.action';
import { ProductTable } from '@/components/admin/product-table';

const TeachersPage = async () => {
  const type = 'products';
  const products = await getProducts();
  return <ProductTable rows={products} columns={productColumns} type={type} />;
};

export default TeachersPage;
