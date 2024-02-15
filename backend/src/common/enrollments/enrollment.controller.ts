import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Post(':id/approve')
  async approveEnrollmentById(@Param('id') id: string): Promise<Enrollment> {
    return this.courseService.approveEnrollmentById(id);
  }

  @Post(':id/reject')
  async rejectEnrollmentById(@Param('id') id: string): Promise<Enrollment> {
    return this.courseService.rejectEnrollmentById(id);
  }

  @Delete(':id')
  async deleteEnrollmentById(@Param('id') id: string): Promise<Enrollment> {
    return this.courseService.deleteEnrollmentById(id);
  }
}
