import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService, JwtService],
})
export class TeacherModule {}
