import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from '../../dtos';

const role = 'ADMIN';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createAdmin(adminData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(adminData.password);
    const student = await this.prismaService.user.create({
      data: {
        ...adminData,
        password: hashedPassword,
        birthYear: Number(adminData.birthYear),
        role,
      },
    });
    return delete student.password && student;
  }

  async getAllAdmins(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
      },
      where: {
        role,
      },
    });
  }

  async getAdminById(id: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
      },
      where: {
        id,
        role,
      },
    });
  }

  async getAdminByEmail(email: string): Promise<UserDto> {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        name: true,
        birthYear: true,
        email: true,
        role: true,
        createdAt: true,
      },
      where: {
        email,
        role,
      },
    });
  }

  async updateAdminById(id: string, adminData): Promise<User> {
    if (!adminData.password || adminData.password === '') {
      delete adminData.password;
    }

    return this.prismaService.user.update({
      where: {
        id,
        role,
      },
      data: {
        ...adminData,
        birthYear: Number(adminData.birthYear),
        ...(adminData.password && {
          password: await this.hashPassword(adminData.password),
        }),
      },
    });
  }

  async deleteAdminById(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
        role,
      },
    });
  }
}
