import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Attendance } from '@prisma/client';

@Injectable()
export class AttendanceService {
  constructor(private prismaService: PrismaService) {}

  async createAttendance(attendanceData): Promise<Attendance> {
    if (!attendanceData.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    if (!attendanceData.classId) {
      throw new BadRequestException('Class ID is required');
    }

    return this.prismaService.attendance.create({
      data: attendanceData,
    });
  }

  async getAllAttendances(): Promise<Attendance[]> {
    return this.prismaService.attendance.findMany({
      include: {
        class: true,
        student: true,
      },
    });
  }

  async getAttendanceById(id: string): Promise<Attendance> {
    return this.prismaService.attendance.findUnique({
      where: {
        id,
      },
      include: {
        class: true,
        student: true,
      },
    });
  }

  async updateAttendanceById(id: string, attendanceData): Promise<Attendance> {
    if (!attendanceData.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    if (!attendanceData.classId) {
      throw new BadRequestException('Class ID is required');
    }

    if (!attendanceData.status) {
      throw new BadRequestException('Status is required');
    }

    const status = attendanceData.status.toLowerCase();

    if (status !== 'present' && status !== 'absent') {
      throw new BadRequestException('Status must be present or absent');
    }

    return this.prismaService.attendance.update({
      where: {
        id,
      },
      data: attendanceData,
    });
  }

  async deleteAttendanceById(id: string): Promise<Attendance> {
    return this.prismaService.attendance.delete({
      where: {
        id,
      },
    });
  }
}
