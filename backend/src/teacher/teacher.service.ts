import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Teacher } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class TeacherService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createTeacher(teacherData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(teacherData.password);
    const student = await this.prismaService.teacher.create({
      data: {
        ...teacherData,
        password: hashedPassword,
      },
    });
    return delete student.password && student;
  }

  async getAllTeachers(): Promise<UserDto[]> {
    return this.prismaService.teacher.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async getTeacherById(id: string): Promise<Teacher> {
    return this.prismaService.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  async getTeacherByEmail(email: string): Promise<Teacher> {
    return this.prismaService.teacher.findUnique({
      where: {
        email,
      },
    });
  }

  async updateTeacherById(id: string, teacherData): Promise<Teacher> {
    return this.prismaService.teacher.update({
      where: {
        id,
      },
      data: {
        ...teacherData,
      },
    });
  }

  async deleteTeacherById(id: string): Promise<Teacher> {
    return this.prismaService.teacher.delete({
      where: {
        id,
      },
    });
  }
}
