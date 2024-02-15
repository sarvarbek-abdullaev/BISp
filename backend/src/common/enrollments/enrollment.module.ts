import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../../prisma.service';
import { StudentService } from '../students/student.service';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService, PrismaService, StudentService],
})
export class EnrollmentModule {}
