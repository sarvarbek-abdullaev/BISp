import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private adminService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.adminService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.adminService.getProductById(id);
  }

  @Put(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() adminData: Product,
  ): Promise<Product> {
    return await this.adminService.updateProductById(id, adminData);
  }

  @Post()
  async createProduct(@Body() adminData: Product): Promise<Product> {
    return await this.adminService.createProduct(adminData);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<Product> {
    return await this.adminService.deleteProductById(id);
  }
}
