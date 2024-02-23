import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Class } from '@prisma/client';
import { ClassService } from './class.service';

@Controller('classes')
export class ClassController {
  constructor(private adminService: ClassService) {}

  @Get()
  async getAllClasss(): Promise<Class[]> {
    return await this.adminService.getAllClasses();
  }

  @Get(':id')
  async getClassById(@Param('id') id: string): Promise<Class> {
    return await this.adminService.getClassById(id);
  }

  @Post()
  async createClass(@Body() adminData: Class): Promise<Class> {
    return await this.adminService.createClass(adminData);
  }

  @Put(':id')
  async updateClassById(
    @Param('id') id: string,
    @Body() adminData: Class,
  ): Promise<Class> {
    return await this.adminService.updateClassById(id, adminData);
  }

  @Delete(':id')
  async deleteClassById(@Param('id') id: string): Promise<Class> {
    return await this.adminService.deleteClassById(id);
  }
}
