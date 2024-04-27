import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AttendanceClass } from '@prisma/client';

@Injectable()
export class AttendanceClassService {
  constructor(private prisma: PrismaService) {}

  async createAttendanceClass(AttendanceClassData): Promise<AttendanceClass> {
    return this.prisma.attendanceClass.create({
      data: AttendanceClassData,
    });
  }

  async getAllAttendanceClasses(): Promise<AttendanceClass[]> {
    return this.prisma.attendanceClass.findMany();
  }

  async getAttendanceClassById(id: string): Promise<AttendanceClass> {
    return this.prisma.attendanceClass.findUnique({
      where: {
        id,
      },
    });
  }

  async updateAttendanceClassById(
    id: string,
    AttendanceClassData,
  ): Promise<AttendanceClass> {
    return this.prisma.attendanceClass.update({
      where: {
        id,
      },
      data: AttendanceClassData,
    });
  }

  async deleteAttendanceClassById(id: string): Promise<AttendanceClass> {
    return this.prisma.attendanceClass.delete({
      where: {
        id,
      },
    });
  }
}
