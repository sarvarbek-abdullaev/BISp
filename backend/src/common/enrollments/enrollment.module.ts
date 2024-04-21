import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../../prisma.service';
import { StudentService } from '../students/student.service';
import { GroupService } from '../groups/group.service';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService, PrismaService, StudentService, GroupService],
})
export class EnrollmentModule {}
