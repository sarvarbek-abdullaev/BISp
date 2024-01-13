import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class TeacherService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createTeacher(teacherData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(teacherData.password);
    const student = await this.prismaService.user.create({
      data: {
        ...teacherData,
        password: hashedPassword,
        birthYear: Number(teacherData.birthYear),
        role: 'TEACHER',
      },
    });
    return delete student.password && student;
  }

  async getAllTeachers(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      where: {
        role: 'TEACHER',
      },
    });
  }

  async getTeacherById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
        role: 'TEACHER',
      },
    });
  }

  async getTeacherByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email,
        role: 'TEACHER',
      },
    });
  }

  async updateTeacherById(id: string, teacherData): Promise<User> {
    if (!teacherData.password || teacherData.password === '') {
      delete teacherData.password;
    }
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...teacherData,
        birthYear: Number(teacherData.birthYear),
        ...(teacherData.password && {
          password: await this.hashPassword(teacherData.password),
        }),
      },
    });
  }

  async deleteTeacherById(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
        role: 'TEACHER',
      },
    });
  }
}
