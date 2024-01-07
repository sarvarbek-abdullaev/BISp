import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private studentService: StudentService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const student = await this.prismaService.student.findUnique({
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
      token: this.jwtService.sign({ email }),
    };
  }
}
