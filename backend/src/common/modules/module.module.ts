import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { PrismaService } from '../../prisma.service';
import { StudentService } from '../students/student.service';
import { GroupService } from '../groups/group.service';
import { AttendanceClassService } from '../attendanceClasses/attendanceClass.service';

@Module({
  controllers: [ModuleController],
  providers: [
    ModuleService,
    PrismaService,
    StudentService,
    GroupService,
    AttendanceClassService,
  ],
})
export class ModuleModule {}
