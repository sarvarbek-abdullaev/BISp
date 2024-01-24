import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UserGroup } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(private prismaService: PrismaService) {}

  async createUserGroup(userId: string, groupId: string): Promise<UserGroup> {
    try {
      return this.prismaService.userGroup.create({
        data: {
          user: {
            connect: {
              id: userId,
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

  async createUserGroups(userGroups: UserGroup[]): Promise<any> {
    try {
      if (userGroups.length < 1) {
        return false;
      }
      return this.prismaService.userGroup.createMany({
        data: Array.from(userGroups),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserGroupById(id: string): Promise<UserGroup> {
    return this.prismaService.userGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllUserGroups(): Promise<UserGroup[]> {
    return this.prismaService.userGroup.findMany();
  }

  async updateUserGroupById(id: string, userGroup): Promise<UserGroup> {
    return this.prismaService.userGroup.update({
      where: {
        id,
      },
      data: {
        ...userGroup,
      },
    });
  }

  async updateUserGroups(userGroups, deletedIds): Promise<any> {
    if (!userGroups || !deletedIds) throw new BadRequestException();
    try {
      return Promise.all([
        this.createUserGroups(userGroups),
        this.deleteUserGroupsByIds(deletedIds),
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

  async deleteUserGroupById(id: string): Promise<any> {
    try {
      return this.prismaService.userGroup.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove groups from students');
    }
  }

  async deleteUserGroupsByIds(ids: string[]): Promise<any> {
    try {
      if (ids.length < 1) {
        return false;
      }
      return this.prismaService.userGroup.deleteMany({
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
