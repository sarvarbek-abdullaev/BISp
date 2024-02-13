import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async createProduct(productData): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        price: true,
        variants: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getProductById(id: string): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProductById(id: string, productData): Promise<Product> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: productData,
    });
  }

  async deleteProductById(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
