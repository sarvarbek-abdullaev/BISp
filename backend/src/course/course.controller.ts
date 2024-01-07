import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Course as CourseModel } from '@prisma/client';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<CourseModel[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.getCourseById(id);
  }

  @Put(':id')
  async updateCourseById(
    @Param('id') id: string,
    @Body() studentData: CourseModel,
  ): Promise<CourseModel> {
    return this.courseService.updateCourseById(id, studentData);
  }

  @Post()
  async signupUser(
    @Body() studentData: { name?: string; email: string; birthYear?: number },
  ): Promise<CourseModel> {
    return this.courseService.createUser(studentData);
  }

  @Delete(':id')
  async deleteCourseById(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.deleteCourseById(id);
  }
}
