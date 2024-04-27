import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttendanceClass } from '@prisma/client';
import { AttendanceClassService } from './attendanceClass.service';

@Controller('attendance-classes')
export class AttendanceClassesController {
  constructor(private attendanceClassService: AttendanceClassService) {}

  @Get()
  async getAllAttendanceClasses(): Promise<AttendanceClass[]> {
    return this.attendanceClassService.getAllAttendanceClasses();
  }

  @Get(':id')
  async getAttendanceClassById(
    @Param('id') id: string,
  ): Promise<AttendanceClass> {
    return this.attendanceClassService.getAttendanceClassById(id);
  }

  @Put(':id')
  async updateAttendanceClassById(
    @Param('id') id: string,
    @Body() studentData: AttendanceClass,
  ): Promise<AttendanceClass> {
    return this.attendanceClassService.updateAttendanceClassById(
      id,
      studentData,
    );
  }

  @Post()
  async createAttendanceClass(
    @Body() studentData: { name?: string; email: string; birthYear?: number },
  ): Promise<AttendanceClass> {
    return this.attendanceClassService.createAttendanceClass(studentData);
  }

  @Delete(':id')
  async deleteAttendanceClassById(
    @Param('id') id: string,
  ): Promise<AttendanceClass> {
    return this.attendanceClassService.deleteAttendanceClassById(id);
  }
}
