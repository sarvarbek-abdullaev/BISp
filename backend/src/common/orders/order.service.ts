import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Order, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(orderData): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        profileId: orderData.profileId,
        orderedProducts: {
          create: orderData.orderedProducts,
        },
      },
    });
  }

  async getAllOrders(): Promise<Order[]> {
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
      return delete order.profile.password && order;
    });
  }

  async getOrderById(id: string): Promise<Order> {
    return this.prismaService.order.findUnique({
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
  }

  async updateOrderStatusById(id: string, status: OrderStatus): Promise<Order> {
    return this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        status,
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
