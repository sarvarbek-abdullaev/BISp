import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(userData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(userData.password);
    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        birthYear: Number(userData.birthYear),
        password: hashedPassword,
      },
    });
    return delete user.password && user;
  }

  async getAllUsers(): Promise<UserDto[]> {
    const res = await this.prismaService.user.findMany({
      include: {
        userGroups: true,
      },
    });
    res.map((student) => {
      delete student.password;
    });
    // {
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   birthYear: true,
    //   createdAt: true,
    //   groupIds: true,
    //   // userGroups: {
    //   //   select: {
    //   //     id: true,
    //   //     groups: {
    //   //       select: {
    //   //         id: true,
    //   //         name: true,
    //   //       },
    //   //     },
    //   //   },
    //   //   orderBy: {
    //   //     groups: {
    //   //       createdAt: 'asc',
    //   //     },
    //   //   },
    //   // },
    // },
    // }
    return res;
  }

  async getUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        userGroups: true,
      },
      // include: {
      // userGroups: {
      //   select: {
      //     id: true,
      //     groups: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //   },
      //   orderBy: {
      //     groups: {
      //       createdAt: 'asc',
      //     },
      //   },
      // },
      // },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      // include: {
      // userGroups: {
      //   select: {
      //     id: true,
      //     groups: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //   },
      //   orderBy: {
      //     groups: {
      //       createdAt: 'asc',
      //     },
      //   },
      // },
      // },
    });
  }

  async updateUserById(id: string, userData): Promise<User> {
    if (userData.password || userData.password === '') {
      delete userData.password;
    }

    return this.prismaService.user.update({
      where: {
        id,
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
      },
    });
  }
}
