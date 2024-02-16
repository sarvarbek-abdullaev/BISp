import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MarkService } from './mark.service';
import { Mark } from '@prisma/client';

@Controller('marks')
export class MarkController {
  constructor(private moduleService: MarkService) {}

  @Get()
  async getAllMarks() {
    return this.moduleService.getAllMarks();
  }

  @Get(':id')
  async getMarkById(@Param('id') id: string) {
    return this.moduleService.getMarkById(id);
  }

  @Post()
  async createMark(@Body() moduleData: Mark) {
    return this.moduleService.createMark(moduleData);
  }

  @Put(':id')
  async updateMarkById(@Param('id') id: string, @Body() moduleData: Mark) {
    return this.moduleService.updateMarkById(id, moduleData);
  }

  @Delete(':id')
  async deleteMarkById(@Param('id') id: string) {
    return this.moduleService.deleteMarkById(id);
  }
}
