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
import { Student as StudentModel } from '@prisma/client';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../authentication/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllStudents(): Promise<StudentModel[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<StudentModel> {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') id: string,
    @Body() studentData: StudentModel,
  ): Promise<StudentModel> {
    return this.studentService.updateStudentById(id, studentData);
  }

  @Post()
  async signupUser(
    @Body() studentData: { name?: string; email: string; birthYear?: number },
  ): Promise<StudentModel> {
    return this.studentService.createUser(studentData);
  }

  @Delete(':id')
  async deleteStudentById(@Param('id') id: string): Promise<StudentModel> {
    return this.studentService.deleteStudentById(id);
  }
}
