import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import {
  Course,
  Lesson,
  Module,
  Order,
  Status,
  Student,
  StudentGroup,
} from '@prisma/client';
import { UserDto } from '../../dtos';
import { GroupService } from '../groups/group.service';

interface StudentWithCurrentGroup extends Student {
  currentGroup: StudentGroup;
}

export interface StudentModulesByYear {
  academicYear: number;
  modules: Module[];
}

export interface UserOrder extends Order {
  total: number;
  quantity: number;
}

@Injectable()
export class StudentService {
  constructor(
    private prismaService: PrismaService,
    private groupService: GroupService,
  ) {}

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
        profile: {
          include: {
            registeredModules: {
              include: {
                module: true,
              },
            },
          },
        },
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

  async getStudentDetailsById(id: string): Promise<Student> {
    return this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        profile: {
          include: {
            registeredModules: {
              include: {
                module: true,
                academicYear: true,
              },
            },
            orders: {
              include: {
                orderedProducts: true,
                payments: true,
              },
            },
            payments: true,
          },
        },
        attendances: true,
        marks: true,
        enrollments: {
          include: {
            course: true,
          },
        },
        studentGroups: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async getStudentsByModuleId(moduleId: string): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        profile: {
          registeredModules: {
            some: {
              moduleId,
            },
          },
        },
      },
      include: {
        profile: true,
        course: true,
      },
    });
  }

  async getStudentsWithAttendanceByModuleId(
    moduleId: string,
  ): Promise<Student[]> {
    const students = await this.prismaService.student.findMany({
      where: {
        profile: {
          registeredModules: {
            some: {
              moduleId,
            },
          },
        },
      },
      include: {
        profile: true,
        studentGroups: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        attendances: {
          include: {
            attendanceClass: true,
          },
        },
      },
    });

    return students.map((student) => {
      const currentGroup = student.studentGroups[0];

      delete student.profile.password;
      delete student.studentGroups;

      return {
        ...student,
        currentGroup,
        attendances: student.attendances,
      };
    });
  }

  async getStudentsWithMarksByModuleId(moduleId: string): Promise<Student[]> {
    const students = await this.prismaService.student.findMany({
      where: {
        profile: {
          registeredModules: {
            some: {
              moduleId,
            },
          },
        },
      },
      include: {
        profile: true,
        studentGroups: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        marks: {
          include: {
            exam: true,
          },
        },
      },
    });

    return students.map((student) => {
      const currentGroup = student.studentGroups[0];

      delete student.profile.password;
      delete student.studentGroups;

      return {
        ...student,
        currentGroup,
        marks: student.marks,
      };
    });
  }

  async getStudentModules(id: string): Promise<StudentModulesByYear[]> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        profile: {
          include: {
            registeredModules: {
              include: {
                module: {
                  include: {
                    course: true,
                  },
                },
                academicYear: {
                  select: {
                    year: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return student.profile.registeredModules.reduce((acc, module) => {
      const existingYearIndex = acc.findIndex(
        (m) => m.academicYear === module.academicYear.year,
      );

      if (existingYearIndex !== -1) {
        acc[existingYearIndex].modules.push(module.module);
      } else {
        acc.push({
          academicYear: module.academicYear.year,
          modules: [module.module],
        });
      }
      return acc;
    }, []);
  }

  async getStudentLessonsById(id: string): Promise<Lesson[]> {
    const student = await this.prismaService.student.findUnique({
      where: {
        id,
      },
      include: {
        profile: {
          include: {
            registeredModules: {
              include: {
                module: {
                  include: {
                    lessons: {
                      include: {
                        group: true,
                        module: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return student.profile.registeredModules.flatMap((module) =>
      module.module.lessons.map((lesson) => lesson),
    );
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
    const studentAttendances = await this.prismaService.student.findFirst({
      where: {
        id,
      },
      include: {
        profile: {
          select: {
            registeredModules: {
              select: {
                module: true,
              },
            },
          },
        },
        attendances: {
          include: {
            attendanceClass: {
              include: {
                attendances: true,
              },
            },
          },
        },
      },
    });

    return studentAttendances.profile.registeredModules.reduce(
      (acc, registeredModule) => {
        const moduleId = registeredModule.module.id;
        const moduleAttendances = studentAttendances.attendances.reduce(
          (moduleAcc, attendance) => {
            if (attendance.attendanceClass.moduleId === moduleId) {
              moduleAcc.push(attendance);
            }
            return moduleAcc;
          },
          [],
        );

        acc.push({
          module: registeredModule.module,
          attendances: moduleAttendances,
        });

        return acc;
      },
      [],
    );
  }

  async getStudentCourse(id: string): Promise<Course> {
    const student = await this.prismaService.student.findFirst({
      where: {
        id,
      },
      include: {
        course: true,
      },
    });

    return student.course;
  }

  async getStudentMarks(id: string): Promise<any> {
    const studentMarks = await this.prismaService.student.findFirst({
      where: {
        id,
      },
      include: {
        profile: {
          include: {
            registeredModules: {
              include: {
                module: {
                  include: {
                    exams: true,
                  },
                },
              },
            },
          },
        },
        marks: {
          include: {
            exam: {
              include: {
                module: true,
              },
            },
          },
        },
      },
    });

    return studentMarks.profile.registeredModules.reduce(
      (acc, registeredModule) => {
        const moduleCode = registeredModule.module.id;
        const moduleMarks = studentMarks.marks.reduce((moduleAcc, mark) => {
          if (mark.exam?.module?.id === moduleCode) {
            moduleAcc.push(delete mark.exam.module && mark);
          }
          return moduleAcc;
        }, []);

        const module = {
          ...registeredModule.module,
          exams: registeredModule.module.exams.map((exam) => {
            const examMark = moduleMarks.find(
              (mark) => mark.examId === exam.id,
            );

            return {
              ...exam,
              mark: examMark ? examMark.mark : null,
            };
          }),
        };

        acc.push(module);

        return acc;
      },
      [],
    );
  }

  async getStudentsForGroup(groupId: string): Promise<Student[]> {
    const group = await this.groupService.getGroupById(groupId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const { level, courseId } = group;

    const students = await this.prismaService.student.findMany({
      where: {
        courseId,
      },
      include: {
        profile: true,
        studentGroups: true,
      },
    });

    students.filter((student) => student.level === level);

    return students.map((student) => {
      const studentGroup = student.studentGroups.find(
        (studentGroup) => studentGroup.groupId === groupId,
      );

      return {
        ...student,
        studentGroupId: studentGroup ? studentGroup.id : null,
      };
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

  async updateStudentImageById(id: string, studentData: any): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            imageUrl: studentData.imageUrl,
          },
        },
      },
      include: {
        profile: true,
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
