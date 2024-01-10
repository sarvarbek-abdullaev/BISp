import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createStudent(studentData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(studentData.password);
    const student = await this.prismaService.user.create({
      data: {
        ...studentData,
        password: hashedPassword,
      },
    });
    return delete student.password && student;
  }

  async getAllStudents(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthYear: true,
      },
    });
  }

  async getStudentById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStudentById(id: string, studentData): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: studentData,
    });
  }

  async deleteStudentById(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
