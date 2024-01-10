import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany({
      include: {
        userGroup: {
          select: {
            user: true,
          },
        },
      },
    });
  }

  async getGroupById(id: string): Promise<Group> {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        userGroup: {
          select: {
            user: true,
          },
        },
      },
    });
  }

  async updateGroupById(id: string, groupData): Promise<Group> {
    return this.prisma.group.update({
      where: {
        id,
      },
      data: groupData,
    });
  }

  async createGroup(groupData): Promise<Group> {
    return this.prisma.group.create({
      data: groupData,
    });
  }

  async deleteGroupById(id: string): Promise<Group> {
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
