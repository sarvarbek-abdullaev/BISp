import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Student } from '@prisma/client';
import { UserDto } from '../../dtos';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getAllStudents(): Promise<UserDto[]> {
    return await this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Student> {
    return await this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') id: string,
    @Body() studentData: Student,
  ): Promise<Student> {
    return await this.studentService.updateStudentById(id, studentData);
  }

  @Post()
  async createStudent(@Body() studentData: Student): Promise<UserDto> {
    return await this.studentService.createStudent(studentData);
  }

  @Delete(':id')
  async deleteStudentById(@Param('id') id: string): Promise<Student> {
    return await this.studentService.deleteStudentById(id);
  }

  @Patch('activate/:id')
  async activateStudentById(@Param('id') id: string): Promise<UserDto> {
    return await this.studentService.activateStudentById(id);
  }

  @Patch('deactivate/:id')
  async deactivateStudentById(@Param('id') id: string): Promise<UserDto> {
    return await this.studentService.deactivateStudentById(id);
  }
}
