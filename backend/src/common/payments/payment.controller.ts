import { Body, Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private adminService: PaymentService) {}

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return await this.adminService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return await this.adminService.getPaymentById(id);
  }

  @Post()
  async createPayment(@Body() adminData: Payment): Promise<Payment> {
    return await this.adminService.createPayment(adminData);
  }

  @Delete(':id')
  async deletePaymentById(@Param('id') id: string): Promise<Payment> {
    return await this.adminService.deletePaymentById(id);
  }
}
