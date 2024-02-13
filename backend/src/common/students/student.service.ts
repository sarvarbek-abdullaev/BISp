import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../../dtos';
import { Status } from '@prisma/client';

const role = 'STUDENT';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(userData): Promise<UserDto> {
    delete userData.password;
    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        birthYear: Number(userData.birthYear),
      },
    });
    return delete user.password && user;
  }

  async getAllUsers(): Promise<UserDto[]> {
    const res = await this.prismaService.user.findMany({
      where: {
        role,
      },
      include: {
        userGroups: {
          select: {
            id: true,
            userId: true,
            group: true,
          },
        },
      },
    });
    res.map((student) => {
      delete student.password;
    });
    return res;
  }

  async getUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
        role,
      },
      include: {
        userGroups: {
          select: {
            id: true,
            userId: true,
            group: true,
          },
        },
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email,
        role,
      },
    });
  }

  async updateUserById(id: string, userData): Promise<User> {
    delete userData.password;
    return this.prismaService.user.update({
      where: {
        id,
        role,
      },
      data: {
        ...userData,
        birthYear: Number(userData.birthYear),
      },
    });
  }

  async deleteUserById(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
        role,
      },
    });
  }

  async activateUserById(id: string): Promise<UserDto> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id,
          role,
          status: Status.INACTIVE,
        },
        data: {
          status: Status.ACTIVE,
        },
        select: {
          id: true,
          email: true,
          name: true,
          birthYear: true,
          status: true,
          role: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async deactivateUserById(id: string): Promise<UserDto> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id,
          role,
          status: Status.ACTIVE,
        },
        data: {
          status: Status.INACTIVE,
        },
        select: {
          id: true,
          email: true,
          name: true,
          birthYear: true,
          status: true,
          role: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
