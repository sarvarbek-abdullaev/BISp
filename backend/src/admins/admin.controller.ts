import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from '../dtos';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../authentication/auth.guard';

@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAdmins(): Promise<UserDto[]> {
    return await this.adminService.getAllAdmins();
  }

  @Get(':id')
  async getAdminById(@Param('id') id: string): Promise<UserDto> {
    return await this.adminService.getAdminById(id);
  }

  @Put(':id')
  async updateAdminById(
    @Param('id') id: string,
    @Body() adminData: User,
  ): Promise<User> {
    return await this.adminService.updateAdminById(id, adminData);
  }

  @Post()
  async createAdmin(@Body() adminData: User): Promise<UserDto> {
    return await this.adminService.createAdmin(adminData);
  }

  @Delete(':id')
  async deleteAdminById(@Param('id') id: string): Promise<User> {
    return await this.adminService.deleteAdminById(id);
  }
}
