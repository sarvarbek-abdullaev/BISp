import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import {
  Course,
  Module,
  Order,
  Status,
  Student,
  StudentGroup,
} from '@prisma/client';
import { UserDto } from '../../dtos';

interface StudentWithCurrentGroup extends Student {
  currentGroup: StudentGroup;
}

export interface StudentCourseWithModules extends Course {
  modules: Module[];
}

export interface UserOrder extends Order {
  total: number;
  quantity: number;
}

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

  async getAllStudents(): Promise<StudentWithCurrentGroup[]> {
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

    return res.map((student) => {
      const currentGroupArr = student.studentGroups.find(
        (studentGroup) => studentGroup.group.status === Status.ACTIVE,
      );

      const currentGroup = !!currentGroupArr ? currentGroupArr[0] : null;
      delete student.profile.password;

      return { ...student, currentGroup };
    });
  }

  async getStudentById(id: string): Promise<StudentWithCurrentGroup> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        marks: {
          include: {
            exam: {
              include: {
                module: true,
              },
            },
          },
        },
        course: true,
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

    const currentGroupArr = student.studentGroups.find(
      (studentGroup) => studentGroup.group.status === Status.ACTIVE,
    );

    const currentGroup = !!currentGroupArr ? currentGroupArr[0] : null;

    return delete student.profile.password && { ...student, currentGroup };
  }

  async getStudentModules(id: string): Promise<StudentCourseWithModules> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          include: {
            modules: true,
          },
        },
      },
    });

    return student.course;
  }

  async getStudentOrders(id: string): Promise<UserOrder[]> {
    const student = await this.prismaService.student.findUnique({
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
          },
        },
      },
    });

    return student.profile.orders.map((order) => {
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

  async getStudentAttendances(id: string): Promise<any> {
    return this.prismaService.attendance.findMany({
      where: {
        studentId: id,
      },
      include: {
        class: {
          include: {
            module: true,
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
