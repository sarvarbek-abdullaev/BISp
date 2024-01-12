import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Admin } from '@prisma/client';
import { UserDto } from '../dtos';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createAdmin(adminData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(adminData.password);
    const student = await this.prismaService.admin.create({
      data: {
        ...adminData,
        password: hashedPassword,
      },
    });
    return delete student.password && student;
  }

  async getAllAdmins(): Promise<UserDto[]> {
    return this.prismaService.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async getAdminById(id: string): Promise<Admin> {
    return this.prismaService.admin.findUnique({
      where: {
        id,
      },
    });
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    return this.prismaService.admin.findUnique({
      where: {
        email,
      },
    });
  }

  async updateAdminById(id: string, adminData): Promise<Admin> {
    return this.prismaService.admin.update({
      where: {
        id,
      },
      data: {
        ...adminData,
      },
    });
  }

  async deleteAdminById(id: string): Promise<Admin> {
    return this.prismaService.admin.delete({
      where: {
        id,
      },
    });
  }
}
