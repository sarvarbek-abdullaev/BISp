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
import { Attendance, Course, Lesson, Student } from '@prisma/client';
import { UserDto } from '../../dtos';
import {
  StudentModulesByYear,
  StudentService,
  UserOrder,
} from './student.service';

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

  @Get(':id/all')
  async getStudentDetailsById(@Param('id') id: string): Promise<Student> {
    return await this.studentService.getStudentDetailsById(id);
  }

  @Get(':id/modules')
  async getStudentModules(
    @Param('id') id: string,
  ): Promise<StudentModulesByYear[]> {
    return await this.studentService.getStudentModules(id);
  }

  @Get(':id/lessons')
  async getStudentLessonsById(@Param('id') id: string): Promise<Lesson[]> {
    return await this.studentService.getStudentLessonsById(id);
  }

  @Get(':id/orders')
  async getStudentOrders(@Param('id') id: string): Promise<UserOrder[]> {
    return await this.studentService.getStudentOrders(id);
  }

  @Get(':id/attendances')
  async getStudentAttendances(@Param('id') id: string): Promise<Attendance[]> {
    return await this.studentService.getStudentAttendances(id);
  }

  @Get(':id/marks')
  async getStudentMarks(@Param('id') id: string): Promise<any> {
    return await this.studentService.getStudentMarks(id);
  }

  @Get(':id/course')
  async getStudentCourse(@Param('id') id: string): Promise<Course> {
    return await this.studentService.getStudentCourse(id);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') id: string,
    @Body() studentData: Student,
  ): Promise<Student> {
    return await this.studentService.updateStudentById(id, studentData);
  }

  @Put(':id/image')
  async updateStudentImageById(
    @Param('id') id: string,
    @Body() studentData: any,
  ): Promise<Student> {
    return await this.studentService.updateStudentImageById(id, studentData);
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
