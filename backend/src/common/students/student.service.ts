import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { Student } from '@prisma/client';
import { UserDto } from '../../dtos';
import { Status } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createStudent(userData): Promise<UserDto> {
    try {
      if (!userData.profile.password) {
        throw new BadRequestException('Password is required');
      }

      const hashedPassword = await this.hashPassword(userData.profile.password);

      const prismaData = {
        profile: {
          create: {
            ...userData.profile,
            password: hashedPassword,
          },
        },
      };

      if (!!userData.courseId) {
        prismaData['course'] = {
          connect: {
            id: userData.courseId,
          },
        };
      }

      const student = await this.prismaService.student.create({
        data: prismaData,
        include: {
          profile: true,
          course: true,
        },
      });

      return delete student.profile.password && student;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async getAllStudents(): Promise<UserDto[]> {
    const res = await this.prismaService.student.findMany({
      include: {
        profile: true,
        course: true,
        studentGroups: {
          select: {
            id: true,
            studentId: true,
            group: true,
          },
        },
      },
    });
    res.map((student) => {
      delete student.profile.password;
    });
    return res;
  }

  async getStudentById(id: string): Promise<Student> {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        studentGroups: {
          select: {
            id: true,
            studentId: true,
            group: true,
          },
        },
      },
    });
  }

  // async getStudentByEmail(email: string): Promise<Student> {
  //   return this.prismaService.student.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  // }

  async updateStudentById(id: string, userData): Promise<Student> {
    if (userData.password) {
      throw new NotFoundException('Password cannot be updated');
    }

    if (userData.role) {
      throw new NotFoundException('Role cannot be updated');
    }

    const courseData = !!userData.courseId
      ? {
          connect: {
            id: userData.courseId,
          },
        }
      : {
          disconnect: true,
        };

    const prismaData = {
      profile: {
        update: userData.profile,
      },
      course: courseData,
    };

    const student = await this.prismaService.student.update({
      where: {
        id,
      },
      data: prismaData,
      include: {
        profile: true,
        course: true,
      },
    });

    return delete student.profile.password && student;
  }

  async deleteStudentById(id: string): Promise<Student> {
    return this.prismaService.student.delete({
      where: {
        id,
      },
    });
  }

  async activateStudentById(id: string): Promise<UserDto> {
    try {
      const user = await this.prismaService.student.update({
        where: {
          id,
          profile: {
            status: Status.INACTIVE,
          },
        },
        data: {
          profile: {
            update: {
              status: Status.ACTIVE,
            },
          },
        },
        include: {
          profile: true,
        },
      });
      if (!user) {
        throw new NotFoundException('Student not found');
      }

      return user;
    } catch (e) {
      throw new NotFoundException('Student not found');
    }
  }

  async deactivateStudentById(id: string): Promise<UserDto> {
    try {
      const user = await this.prismaService.student.update({
        where: {
          id,
          profile: {
            status: Status.ACTIVE,
          },
        },
        data: {
          profile: {
            update: {
              status: Status.INACTIVE,
            },
          },
        },
        include: {
          profile: true,
        },
      });
      if (!user) {
        throw new NotFoundException('Student not found');
      }

      return user;
    } catch (e) {
      throw new NotFoundException('Student not found');
    }
  }

  async setStudentCourse(id: string, courseId: string): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });
  }
}
