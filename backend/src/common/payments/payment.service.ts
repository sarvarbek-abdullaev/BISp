import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Payment, PaymentType } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prismaService: PrismaService) {}

  async createPayment(orderData): Promise<Payment> {
    const { profileId, amount } = orderData;

    return await this.prismaService.payment.create({
      data: {
        profile: {
          connect: {
            id: profileId,
          },
        },
        amount,
        type: PaymentType.STUDY,
      },
    });
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.prismaService.payment.findMany({
      include: {
        profile: true,
      },
    });
  }

  async getPaymentById(id: string): Promise<Payment> {
    return this.prismaService.payment.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
  }

  async deletePaymentById(id: string): Promise<Payment> {
    return this.prismaService.payment.delete({
      where: {
        id,
      },
    });
  }
}
