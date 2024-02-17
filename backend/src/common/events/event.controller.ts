import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';

@Controller('events')
export class EventController {
  constructor(private moduleService: EventService) {}

  @Get()
  async getAllEvents() {
    return this.moduleService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.moduleService.getEventById(id);
  }

  @Post()
  async createEvent(@Body() moduleData: Event) {
    return this.moduleService.createEvent(moduleData);
  }

  @Put(':id')
  async updateEventById(@Param('id') id: string, @Body() moduleData: Event) {
    return this.moduleService.updateEventById(id, moduleData);
  }

  @Delete(':id')
  async deleteEventById(@Param('id') id: string) {
    return this.moduleService.deleteEventById(id);
  }
}
