import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserGroup } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(private prismaService: PrismaService) {}

  async createUserGroup(userId: string, groupId: string): Promise<UserGroup> {
    try {
      const userHasGroup = await this.prismaService.userGroup.findFirst({
        where: {
          user: {
            id: userId,
          },
          group: {
            id: groupId,
          },
        },
      });
      if (userHasGroup) {
        throw new ForbiddenException('User already has group');
      }
      return await this.prismaService.userGroup.create({
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
      console.error(error);
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  async getUserGroupById(id: string): Promise<UserGroup> {
    return this.prismaService.userGroup.findUnique({
      where: {
        id,
      },
    });
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

  async deleteUserGroupById(id: string): Promise<any> {
    try {
      return this.prismaService.userGroup.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove group from student');
    }
  }
}
