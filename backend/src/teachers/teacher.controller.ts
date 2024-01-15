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
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../authentication/auth.guard';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTeachers(): Promise<UserDto[]> {
    return await this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<User> {
    return await this.teacherService.getTeacherById(id);
  }

  @Put(':id')
  async updateTeacherById(
    @Param('id') id: string,
    @Body() studentData: User,
  ): Promise<User> {
    return await this.teacherService.updateTeacherById(id, studentData);
  }

  @Post()
  async createTeacher(@Body() studentData: User): Promise<UserDto> {
    return await this.teacherService.createTeacher(studentData);
  }

  @Delete(':id')
  async deleteTeacherById(@Param('id') id: string): Promise<User> {
    return await this.teacherService.deleteTeacherById(id);
  }
}
