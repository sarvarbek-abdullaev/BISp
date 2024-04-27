import { Module } from '@nestjs/common';
import { AttendanceClassesController } from './attendanceClass.controller';
import { AttendanceClassService } from './attendanceClass.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [AttendanceClassesController],
  providers: [AttendanceClassService, PrismaService],
})
export class AttendanceClassModule {}
