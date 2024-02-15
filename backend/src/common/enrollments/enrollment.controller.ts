import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Enrollment } from '@prisma/client';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private courseService: EnrollmentService) {}

  @Get()
  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.courseService.getAllEnrollments();
  }

  @Get(':id')
  async getEnrollmentById(@Param('id') id: string): Promise<Enrollment> {
    return this.courseService.getEnrollmentById(id);
  }

  @Put(':id')
  async updateEnrollmentById(
    @Param('id') id: string,
    @Body() studentData: Enrollment,
  ): Promise<Enrollment> {
    return this.courseService.updateEnrollmentById(id, studentData);
  }

  @Post()
  async signupUser(
    @Body() studentData: { name?: string; email: string; birthYear?: number },
  ): Promise<Enrollment> {
    return this.courseService.createEnrollment(studentData);
  }

  @Delete(':id')
  async deleteEnrollmentById(@Param('id') id: string): Promise<Enrollment> {
    return this.courseService.deleteEnrollmentById(id);
  }
}
