import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Module } from '@prisma/client';

@Controller('module')
export class ModuleController {
  constructor(private moduleService: ModuleService) {}

  @Get()
  async getAllModules() {
    return this.moduleService.getAllModules();
  }

  @Get(':id')
  async getModuleById(@Param('id') id: string) {
    return this.moduleService.getModuleById(id);
  }

  @Post()
  async createModule(moduleData) {
    return this.moduleService.createModule(moduleData);
  }

  @Put(':id')
  async updateModuleById(@Param('id') id: string, @Body() moduleData: Module) {
    return this.moduleService.updateModuleById(id, moduleData);
  }

  @Delete(':id')
  async deleteModuleById(@Param('id') id: string) {
    return this.moduleService.deleteModuleById(id);
  }
}
