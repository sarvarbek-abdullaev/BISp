import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      if (!teacherData.profile.password) {
        throw new BadRequestException('Password is required');
      }

      const hashedPassword = await this.hashPassword(
        teacherData.profile.password,
      );

      const prismaData = {
        profile: {
          create: {
            ...teacherData.profile,
            password: hashedPassword,
            role: Role.TEACHER,
          },
        },
      };

      if (!!teacherData.courseId) {
        prismaData['course'] = {
          connect: {
            id: teacherData.courseId,
          },
        };
      }

      const teacher = await this.prismaService.teacher.create({
        data: prismaData,
        include: {
          profile: true,
          course: true,
        },
      });

      return delete teacher.profile.password && teacher;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getAllTeachers(): Promise<UserDto[]> {
    const teachers = await this.prismaService.teacher.findMany({
      include: {
        profile: true,
        modules: true,
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
        course: true,
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
    if (teacherData.password) {
      throw new BadRequestException(
        'You cannot update the password of an admin using this endpoint. Use the /auth/change-password endpoint instead.',
      );
    }

    if (teacherData.role) {
      throw new BadRequestException('You cannot change the role');
    }

    const courseData = !!teacherData.courseId
      ? {
          connect: {
            id: teacherData.courseId,
          },
        }
      : {
          disconnect: true,
        };

    const prismaData = {
      profile: {
        update: teacherData.profile,
      },
      course: courseData,
    };

    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
      },
      data: prismaData,
      include: {
        profile: true,
        course: true,
        modules: true,
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
