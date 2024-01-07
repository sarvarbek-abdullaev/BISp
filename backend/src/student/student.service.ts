import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Student } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(studentData): Promise<Student> {
    const hashedPassword = await this.hashPassword(studentData.password);
    return this.prisma.student.create({
      data: {
        ...studentData,
        password: hashedPassword,
      },
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
