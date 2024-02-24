import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getOrdersByUserId } from '@/actions/handleGet.action';
import Image from 'next/image';
import PageContainer from '@/components/user/page-container';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const role = session.user.profile.role.toLowerCase();

  const orders: any[] = await getOrdersByUserId(role, session?.user.id);

  return (
    <PageContainer title="Orders:">
      {orders.map((order) => {
        return (
          <div key={order.id} className="flex flex-col p-5 my-5 border-2">
            <h2 className="text-lg font-bold block mb-4">Order: {order.id}</h2>
            <div className="flex flex-col w-full">
              {order.orderedProducts.map((orderedProduct: any) => {
                return (
                  <div key={orderedProduct.id} className="flex gap-2">
                    <Image src={orderedProduct.product.image} alt="product" width={100} height={100} />
                    <div className="flex flex-col text-lg">
                      <p>
                        {orderedProduct.product.name} - ${orderedProduct.product.price}
                      </p>
                      <p>Quantity: {orderedProduct.quantity}</p>
                      <p>Total: ${orderedProduct.quantity * orderedProduct.product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col mt-10">
              <p className="text-lg font-bold">Total Quantity: {order.quantity}</p>
              <p className="text-lg font-bold">Total: ${order.total}</p>
            </div>
          </div>
        );
      })}
    </PageContainer>
  );
};

export default Page;
