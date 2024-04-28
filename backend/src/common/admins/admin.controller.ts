import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { UserDto } from '../../dtos';
import { AdminService } from './admin.service';
import { UserOrder } from '../students/student.service';

@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAllAdmins(): Promise<UserDto[]> {
    return await this.adminService.getAllAdmins();
  }

  @Get(':id')
  async getAdminById(@Param('id') id: string): Promise<UserDto> {
    return await this.adminService.getAdminById(id);
  }

  @Get(':id/all')
  async getAdminDetailsById(@Param('id') id: string): Promise<UserDto> {
    return await this.adminService.getAdminDetailsById(id);
  }

  // this is for deploy

  @Get(':id/orders')
  async getAdminOrders(@Param('id') id: string): Promise<UserOrder[]> {
    return await this.adminService.getAdminOrders(id);
  }

  @Put(':id')
  async updateAdminById(
    @Param('id') id: string,
    @Body() adminData: Admin,
  ): Promise<Admin> {
    return await this.adminService.updateAdminById(id, adminData);
  }

  @Put(':id')
  async updateAdminImageById(
    @Param('id') id: string,
    @Body() adminData: Admin,
  ): Promise<Admin> {
    return await this.adminService.updateAdminImageById(id, adminData);
  }

  @Post()
  async createAdmin(@Body() adminData: Admin): Promise<UserDto> {
    return await this.adminService.createAdmin(adminData);
  }

  @Delete(':id')
  async deleteAdminById(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.deleteAdminById(id);
  }
}
