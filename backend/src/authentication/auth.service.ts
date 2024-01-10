import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private studentService: StudentService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const student = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!student) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, student.password);
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
      backendTokens: {
        accessToken: this.jwtService.sign({ email }),
      },
    };
  }
}
