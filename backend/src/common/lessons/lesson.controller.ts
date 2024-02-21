import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from '@prisma/client';

@Controller('lessons')
export class LessonController {
  constructor(private moduleService: LessonService) {}

  @Get()
  async getAllLessons() {
    return this.moduleService.getAllLessons();
  }

  @Get(':id')
  async getLessonById(@Param('id') id: string) {
    return this.moduleService.getLessonById(id);
  }

  @Post()
  async createLesson(@Body() lessonData: Lesson) {
    return this.moduleService.createLesson(lessonData);
  }

  @Put(':id')
  async updateLessonById(@Param('id') id: string, @Body() lessonData: Lesson) {
    return this.moduleService.updateLessonById(id, lessonData);
  }

  @Delete(':id')
  async deleteLessonById(@Param('id') id: string) {
    return this.moduleService.deleteLessonById(id);
  }
}
