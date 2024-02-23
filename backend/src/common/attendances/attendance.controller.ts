import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { AttendanceService } from './attendance.service';

@Controller('attendances')
export class AttendanceController {
  constructor(private adminService: AttendanceService) {}

  @Get()
  async getAllAttendances(): Promise<Attendance[]> {
    return await this.adminService.getAllAttendances();
  }

  @Get(':id')
  async getAttendanceById(@Param('id') id: string): Promise<Attendance> {
    return await this.adminService.getAttendanceById(id);
  }

  @Post()
  async createAttendance(
    @Body() attendanceData: Attendance,
  ): Promise<Attendance> {
    return await this.adminService.createAttendance(attendanceData);
  }

  @Put(':id')
  async updateAttendanceById(
    @Param('id') id: string,
    @Body() attendanceData: Attendance,
  ): Promise<Attendance> {
    return await this.adminService.updateAttendanceById(id, attendanceData);
  }

  @Delete(':id')
  async deleteAttendanceById(@Param('id') id: string): Promise<Attendance> {
    return await this.adminService.deleteAttendanceById(id);
  }
}
