import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private adminService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.adminService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return await this.adminService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() adminData: Order): Promise<Order> {
    return await this.adminService.createOrder(adminData);
  }

  @Patch(':id/paid')
  async updateOrderStatusById(@Param('id') id: string): Promise<Order> {
    return await this.adminService.makePaidOrderById(id);
  }

  @Patch(':id/cancel')
  async cancelOrderById(@Param('id') id: string): Promise<Order> {
    return await this.adminService.cancelOrderById(id);
  }

  // @Put(':id')
  // async updateOrderById(
  //   @Param('id') id: string,
  //   @Body() adminData: Order,
  // ): Promise<Order> {
  //   return await this.adminService.updateOrderById(id, adminData);
  // }

  // @Delete(':id')
  // async deleteOrderById(@Param('id') id: string): Promise<Order> {
  //   return await this.adminService.deleteOrderById(id);
  // }
}
