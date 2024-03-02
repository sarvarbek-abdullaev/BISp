import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AcademicYear } from '@prisma/client';

@Injectable()
export class AcademicYearService {
  constructor(private prisma: PrismaService) {}

  async getAllAcademicYears(): Promise<AcademicYear[]> {
    return this.prisma.academicYear.findMany();
  }

  async getAcademicYearById(id: string): Promise<AcademicYear> {
    return this.prisma.academicYear.findUnique({
      where: {
        id,
      },
    });
  }

  async createAcademicYear(attendanceData): Promise<any> {
    if (!attendanceData.year) {
      throw new ForbiddenException('Year is required');
    }

    return this.prisma.academicYear.create({
      data: attendanceData,
    });
  }

  async deleteAcademicYearById(id: string): Promise<AcademicYear> {
    return this.prisma.academicYear.delete({
      where: {
        id,
      },
    });
  }
}
