import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Enrollment, EnrollmentStatus } from '@prisma/client';
import { StudentService } from '../students/student.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private prisma: PrismaService,
    private studentService: StudentService,
  ) {}

  async createEnrollment(enrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.create({
      data: enrollmentData,
    });
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      include: {
        course: true,
        student: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async getEnrollmentById(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        student: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async approveEnrollmentById(id: string): Promise<Enrollment> {
    const enrollment = await this.prisma.enrollment.update({
      where: {
        id,
        status: EnrollmentStatus.PENDING,
      },
      data: {
        status: EnrollmentStatus.APPROVED,
      },
    });

    await this.studentService.setStudentCourse(
      enrollment.studentId,
      enrollment.courseId,
    );

    return enrollment;
  }

  async rejectEnrollmentById(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: {
        id,
        status: EnrollmentStatus.PENDING,
      },
      data: {
        status: EnrollmentStatus.CANCELED,
      },
    });
  }

  async deleteEnrollmentById(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.delete({
      where: {
        id,
      },
    });
  }
}
