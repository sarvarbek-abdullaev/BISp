import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany({
      include: {
        userGroups: true,
        course: true,
      },
    });
  }

  async getGroupById(id: string): Promise<Group> {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        // userGroups: {
        //   select: {
        //     user: true,
        //   },
        // },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  getGroupsByUserId(userId: string): Promise<Group[]> {
    return this.prisma.group.findMany({
      where: {
        userGroups: {
          some: {
            userId,
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
        year: new Date().getUTCFullYear(),
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
}