import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Order, OrderedProduct, OrderStatus } from '@prisma/client';

interface OrderData extends Order {
  subtotal: number;
  quantity: number;
  orderedProducts: OrderedProduct[];
}

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(orderData): Promise<Order> {
    const orderedProducts = orderData.orderedProducts.map((orderedProduct) => {
      return {
        productId: orderedProduct.productId,
        quantity: +orderedProduct.quantity,
        selectedSize: orderedProduct.selectedSize,
      };
    });
    return this.prismaService.order.create({
      data: {
        profileId: orderData.profileId,
        orderedProducts: {
          create: orderedProducts,
        },
      },
    });
  }

  async getAllOrders(): Promise<OrderData[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        profile: true,
        orderedProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => {
      const subtotal = order.orderedProducts.reduce((acc, orderedProduct) => {
        return acc + orderedProduct.product.price * orderedProduct.quantity;
      }, 0);

      return {
        ...order,
        subtotal,
        quantity: order.orderedProducts.reduce((acc, orderedProduct) => {
          return acc + orderedProduct.quantity;
        }, 0),
        orderedProducts: order.orderedProducts,
      };
    });
  }

  async getOrderById(id: string): Promise<OrderData> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        orderedProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    const subtotal = order.orderedProducts.reduce((acc, orderedProduct) => {
      return acc + orderedProduct.product.price * orderedProduct.quantity;
    }, 0);

    return {
      ...order,
      subtotal,
      quantity: order.orderedProducts.reduce((acc, orderedProduct) => {
        return acc + orderedProduct.quantity;
      }, 0),
      orderedProducts: order.orderedProducts,
    };
  }

  async makePaidOrderById(id: string): Promise<Order> {
    return this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.PAID,
      },
    });
  }

  async cancelOrderById(id: string): Promise<Order> {
    return this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.CANCELED,
      },
    });
  }

  // async updateOrderById(id: string, orderData): Promise<Order> {
  //   return this.prismaService.order.update({
  //     where: {
  //       id,
  //     },
  //     data: orderData,
  //   });
  // }
  //
  // async deleteOrderById(id: string): Promise<Order> {
  //   return this.prismaService.order.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
