import { orderColumns } from '@/tabs';
import { getOrders } from '@/utils/backend-route';
import { OrderTable } from '@/components/admin/order-table';

const TeachersPage = async () => {
  const type = 'orders';
  const orders = await getOrders();
  return <OrderTable rows={orders} columns={orderColumns} type={type} />;
};

export default TeachersPage;
