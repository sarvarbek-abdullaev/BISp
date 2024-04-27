import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ModuleService } from '../modules/module.service';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService, JwtService, ModuleService],
})
export class TeacherModule {}
