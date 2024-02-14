import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, Student } from '@prisma/client';
import { UserDto } from '../../dtos';
import { Status } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createStudent(userData): Promise<UserDto> {
    delete userData.password;
    const student = await this.prismaService.student.create({
      data: {
        profile: {
          ...userData,
          role: Role.STUDENT,
        },
      },
      include: {
        profile: true,
      },
    });

    delete student.profile.password;
    return student;
  }

  async getAllStudents(): Promise<UserDto[]> {
    const res = await this.prismaService.student.findMany({
      include: {
        profile: true,
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
    delete userData.password;
    return this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        profile: {
          ...userData,
        },
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
}
