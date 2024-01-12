import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Student } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createStudent(studentData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(studentData.password);
    const student = await this.prismaService.student.create({
      data: {
        ...studentData,
        password: hashedPassword,
      },
    });
    return delete student.password && student;
  }

  async getAllStudents(): Promise<UserDto[]> {
    return this.prismaService.student.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthYear: true,
        createdAt: true,
        studentGroup: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            group: {
              createdAt: 'asc',
            },
          },
        },
      },
    });
  }

  async getStudentById(id: string): Promise<Student> {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        studentGroup: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            group: {
              createdAt: 'asc',
            },
          },
        },
      },
    });
  }

  async getStudentByEmail(email: string): Promise<Student> {
    return this.prismaService.student.findUnique({
      where: {
        email,
      },
      include: {
        studentGroup: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            group: {
              createdAt: 'asc',
            },
          },
        },
      },
    });
  }

  async updateStudentById(id: string, studentData): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        ...studentData,
      },
    });
  }

  async deleteStudentById(id: string): Promise<Student> {
    return this.prismaService.student.delete({
      where: {
        id,
      },
    });
  }
}
