import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, Teacher } from '@prisma/client';
import { UserDto } from '../../dtos';

@Injectable()
export class TeacherService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createTeacher(teacherData): Promise<UserDto> {
    const teacher = await this.prismaService.teacher.create({
      data: {
        profile: {
          ...teacherData,
          role: Role.TEACHER,
        },
      },
      include: {
        profile: true,
      },
    });
    return delete teacher.profile.password && teacher;
  }

  async getAllTeachers(): Promise<UserDto[]> {
    const teachers = await this.prismaService.teacher.findMany({
      include: {
        profile: true,
      },
    });

    return teachers.map((teacher) => {
      return delete teacher.profile.password && teacher;
    });
  }

  async getTeacherById(id: string): Promise<UserDto> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    return delete teacher.profile.password && teacher;
  }

  // async getTeacherByEmail(email: string): Promise<UserDto> {
  //   return this.prismaService.teacher.findUnique({
  //     where: {
  //       email,
  //     },
  //     include: {
  //       profile: true,
  //     },
  //   });
  // }

  async updateTeacherById(id: string, teacherData): Promise<Teacher> {
    delete teacherData.password;

    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: teacherData,
        },
      },
      include: {
        profile: true,
      },
    });

    return delete teacher.profile.password && teacher;
  }

  async deleteTeacherById(id: string): Promise<Teacher> {
    return this.prismaService.teacher.delete({
      where: {
        id,
      },
    });
  }
}
