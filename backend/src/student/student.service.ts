import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async createUser(studentData): Promise<Student> {
    return this.prisma.student.create({
      data: studentData,
    });
  }

  async getAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStudentById(id: string, studentData): Promise<Student> {
    return this.prisma.student.update({
      where: {
        id,
      },
      data: studentData,
    });
  }

  async deleteStudentById(id: string): Promise<Student> {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
