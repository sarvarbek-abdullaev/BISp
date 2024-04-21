import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Group, Status } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany({
      include: {
        studentGroups: true,
        course: true,
      },
    });
  }

  async getGroupById(id: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: {
        id,
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async getGroupDetailsById(id: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        studentGroups: {
          include: {
            student: {
              include: {
                profile: true,
              },
            },
          },
        },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    group.studentGroups = group.studentGroups.map((studentGroup) => {
      return {
        ...studentGroup,
        student: {
          ...studentGroup.student,
          profile: {
            ...studentGroup.student.profile,
            password: undefined,
          },
        },
      };
    });

    return group;
  }

  getGroupsByUserId(id: string): Promise<Group[]> {
    return this.prisma.group.findMany({
      where: {
        studentGroups: {
          some: {
            id,
          },
        },
      },
    });
  }

  async updateGroupById(id: string, groupData): Promise<Group> {
    delete groupData.userIds;

    return this.prisma.group.update({
      where: {
        id,
      },
      data: groupData,
    });
  }

  async createGroup(groupData): Promise<Group> {
    return this.prisma.group.create({
      data: {
        ...groupData,
      },
    });
  }

  async deleteGroupById(id: string): Promise<Group> {
    try {
      const existingGroup = await this.prisma.group.findUnique({
        where: {
          id,
        },
      });
      if (!existingGroup) {
        throw new NotFoundException(`Group with ID ${id} not found`);
      }

      return this.prisma.group.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        console.error(error);
        throw new NotFoundException(error.message);
      }
    }
  }

  async deactivateGroupsByIds(ids: string[]) {
    return this.prisma.group.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status: Status.INACTIVE,
      },
    });
  }

  // async deactivateGroupsByYear(year: number) {
  //   return this.prisma.group.updateMany({
  //     where: {
  //       year,
  //     },
  //     data: {
  //       status: Status.INACTIVE,
  //     },
  //   });
  // }
}
