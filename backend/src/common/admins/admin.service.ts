import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { Admin, Role } from '@prisma/client';
import { UserDto } from '../../dtos';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createAdmin(adminData): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(adminData.profile.password);
    const admin = await this.prismaService.admin.create({
      data: {
        ...adminData,
        profile: {
          create: {
            ...adminData.profile,
            password: hashedPassword,
            role: Role.ADMIN,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    delete admin.profile.password;
    return admin;
  }

  async getAllAdmins(): Promise<UserDto[]> {
    const admins = await this.prismaService.admin.findMany({
      include: {
        profile: true,
      },
    });

    return admins.map((admin) => {
      return delete admin.profile.password && admin;
    });
  }

  async getAdminById(id: string): Promise<UserDto> {
    const admin = await this.prismaService.admin.findUnique({
      select: {
        id: true,
        profile: true,
      },
      where: {
        id,
      },
    });

    return delete admin.profile.password && admin;
  }

  // async getAdminByEmail(email: string): Promise<UserDto> {
  //   const admin = await this.prismaService.admin.findUnique({
  //     select: {
  //       id: true,
  //       profile: true,
  //     },
  //     where: {
  //       profile: {
  //         email,
  //       },
  //     },
  //   });
  // }

  async updateAdminById(id: string, adminData): Promise<Admin> {
    if (adminData.password) {
      throw new BadRequestException(
        'You cannot update the password of an admin using this endpoint. Use the /auth/change-password endpoint instead.',
      );
    }

    if (adminData.role) {
      throw new BadRequestException('You cannot change the role of an admin');
    }

    const admin = await this.prismaService.admin.update({
      where: {
        id,
      },
      data: {
        ...adminData,
        profile: {
          update: {
            ...adminData.profile,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    return delete admin.profile.password && admin;
  }

  async deleteAdminById(id: string): Promise<Admin> {
    return this.prismaService.admin.delete({
      where: {
        id,
      },
    });
  }
}
