import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StudentGroup } from '@prisma/client';

@Injectable()
export class StudentGroupService {
  constructor(private prismaService: PrismaService) {}

  async createStudentGroup(
    studentId: string,
    groupId: string,
  ): Promise<StudentGroup> {
    try {
      const userHasGroup = await this.prismaService.studentGroup.findFirst({
        where: {
          student: {
            id: studentId,
          },
          group: {
            id: groupId,
          },
        },
      });
      if (userHasGroup) {
        throw new ForbiddenException('User already has group');
      }
      return await this.prismaService.studentGroup.create({
        data: {
          student: {
            connect: {
              id: studentId,
            },
          },
          group: {
            connect: {
              id: groupId,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  async getStudentGroupById(id: string): Promise<StudentGroup> {
    return this.prismaService.studentGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStudentGroupById(id: string, userGroup): Promise<StudentGroup> {
    return this.prismaService.studentGroup.update({
      where: {
        id,
      },
      data: {
        ...userGroup,
      },
    });
  }

  async deleteStudentGroupById(id: string): Promise<any> {
    try {
      return this.prismaService.studentGroup.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove group from user');
    }
  }
}
