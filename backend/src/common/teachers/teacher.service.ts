import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, Teacher } from '@prisma/client';
import { UserDto } from '../../dtos';
import { UserOrder } from '../students/student.service';

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
        modules: {
          connect: teacherData.moduleIds
            ? teacherData.moduleIds.map((id) => {
                return {
                  id,
                };
              })
            : [],
        },
      };

      const teacher = await this.prismaService.teacher.create({
        data: prismaData,
        include: {
          profile: true,
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
        modules: true,
      },
    });

    return delete teacher.profile.password && teacher;
  }

  async getTeacherDetailsById(id: string): Promise<UserDto> {
    return this.prismaService.teacher.findUnique({
      where: {
        id,
      },
      include: {
        profile: {
          include: {
            orders: {
              include: {
                orderedProducts: {
                  include: {
                    product: true,
                  },
                },
              },
            },
            payments: true,
          },
        },
        modules: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async getTeacherModules(id: string): Promise<any> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        id,
      },
      include: {
        modules: true,
      },
    });

    return teacher.modules;
  }

  async getTeacherOrders(id: string): Promise<UserOrder[]> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: {
          include: {
            orders: {
              include: {
                orderedProducts: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return teacher.profile.orders.map((order) => {
      const quantity = order.orderedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0,
      );

      const total = order.orderedProducts.reduce(
        (acc, product) => acc + product.product.price * product.quantity,
        0,
      );

      return { ...order, total, quantity };
    });
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
        'You cannot update the password of an admin using this endpoint. Use the /auth/forgot-password endpoint instead.',
      );
    }

    if (teacherData.role) {
      throw new BadRequestException('You cannot change the role');
    }

    const prismaData = {
      profile: {
        update: teacherData.profile,
      },
      modules: {
        set: teacherData.moduleIds
          ? teacherData.moduleIds.map((id) => {
              return {
                id,
              };
            })
          : [],
      },
    };

    const teacher = await this.prismaService.teacher.update({
      where: {
        id,
      },
      data: prismaData,
      include: {
        profile: true,
        modules: true,
      },
    });

    return delete teacher.profile.password && teacher;
  }

  async updateTeacherImageById(id: string, teacherData: any): Promise<Teacher> {
    return this.prismaService.teacher.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            imageUrl: teacherData.imageUrl,
          },
        },
      },
      include: {
        profile: true,
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
