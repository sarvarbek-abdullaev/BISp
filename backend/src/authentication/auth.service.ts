import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
      include: {
        admins: {
          where: {
            profile: {
              email,
            },
          },
        },
        students: {
          where: {
            profile: {
              email,
            },
          },
        },
        teachers: {
          where: {
            profile: {
              email,
            },
          },
        },
      },
    });
    if (!profile) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, profile.password);
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    const user = {
      id: null,
      profile: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        role: profile.role,
      },
      backendTokens: {
        accessToken: this.jwtService.sign({ email }),
      },
    };

    if (profile.admins.length > 0) {
      user.id = profile.admins[0]?.id;
    }

    if (profile.students.length > 0) {
      user.id = profile.students[0].id;
    }

    if (profile.teachers.length > 0) {
      user.id = profile.teachers[0].id;
    }

    return user;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, oldPassword, newPassword } = changePasswordDto;
    const profile = await this.prismaService.profile.findUnique({
      where: {
        email,
      },
    });
    if (!profile) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(
      oldPassword,
      profile.password,
    );
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prismaService.profile.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }
}
