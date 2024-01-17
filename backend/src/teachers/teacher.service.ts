import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../dtos';

const role = 'TEACHER';

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
        role,
      },
    });
    return delete student.password && student;
  }

  async getAllTeachers(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      where: {
        role,
      },
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getTeacherById(id: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({
      where: {
        id,
        role,
      },
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getTeacherByEmail(email: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({
      where: {
        email,
        role,
      },
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
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
        role,
      },
    });
  }
}
