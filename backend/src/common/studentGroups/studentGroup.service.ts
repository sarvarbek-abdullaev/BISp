import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { StudentGroup } from '@prisma/client';

@Injectable()
export class StudentGroupService {
  constructor(private prismaService: PrismaService) {}

  async createStudentGroup(
    studentId: string,
    groupId: string,
  ): Promise<StudentGroup> {
    try {
      return this.prismaService.studentGroup.create({
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
      throw new Error(error.message);
    }
  }

  async createStudentGroups(studentGroups: StudentGroup[]): Promise<any> {
    try {
      if (studentGroups.length < 1) {
        return false;
      }
      return this.prismaService.studentGroup.createMany({
        data: Array.from(studentGroups),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getStudentGroupById(id: string): Promise<StudentGroup> {
    return this.prismaService.studentGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllStudentGroups(): Promise<StudentGroup[]> {
    return this.prismaService.studentGroup.findMany();
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

  async updateStudentGroups(studentGroups, deletedIds): Promise<any> {
    if (!studentGroups || !deletedIds) throw new BadRequestException();
    try {
      return Promise.all([
        this.createStudentGroups(studentGroups),
        this.deleteStudentGroupsByIds(deletedIds),
      ]);
    } catch (error) {
      console.log(error);
      if (typeof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new Error(error.message);
      }
    }
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
      throw new Error('Failed to remove groups from students');
    }
  }

  async deleteStudentGroupsByIds(ids: string[]): Promise<any> {
    console.log({ ids });
    try {
      if (ids.length < 1) {
        return false;
      }
      return this.prismaService.studentGroup.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove groups from students');
    }
  }
}
