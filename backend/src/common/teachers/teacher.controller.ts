import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { UserDto } from '../../dtos';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(): Promise<UserDto[]> {
    return await this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<UserDto> {
    return await this.teacherService.getTeacherById(id);
  }

  @Put(':id')
  async updateTeacherById(
    @Param('id') id: string,
    @Body() studentData: Teacher,
  ): Promise<Teacher> {
    return await this.teacherService.updateTeacherById(id, studentData);
  }

  @Post()
  async createTeacher(@Body() studentData: Teacher): Promise<UserDto> {
    return await this.teacherService.createTeacher(studentData);
  }

  @Delete(':id')
  async deleteTeacherById(@Param('id') id: string): Promise<Teacher> {
    return await this.teacherService.deleteTeacherById(id);
  }
}
