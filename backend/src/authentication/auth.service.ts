import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { TeacherService } from '../teacher/teacher.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private adminService: AdminService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const users = await Promise.all([
      this.studentService.getStudentByEmail(email),
      this.teacherService.getTeacherByEmail(email),
      this.adminService.getAdminByEmail(email),
    ]);
    const user = users.find((user) => user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      backendTokens: {
        accessToken: this.jwtService.sign({ email }),
      },
    };
  }
}
