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
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../authentication/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllStudents(): Promise<UserDto[]> {
    return await this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<User> {
    return await this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') id: string,
    @Body() studentData: User,
  ): Promise<User> {
    return await this.studentService.updateStudentById(id, studentData);
  }

  @Post()
  async createStudent(@Body() studentData: User): Promise<UserDto> {
    return await this.studentService.createStudent(studentData);
  }

  @Delete(':id')
  async deleteStudentById(@Param('id') id: string): Promise<User> {
    return await this.studentService.deleteStudentById(id);
  }
}
