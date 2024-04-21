import { Module } from '@nestjs/common';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { PrismaService } from '../../prisma.service';
import { ExamService } from '../exams/exam.service';
import { StudentService } from '../students/student.service';
import { GroupService } from '../groups/group.service';

@Module({
  controllers: [MarkController],
  providers: [
    MarkService,
    PrismaService,
    ExamService,
    StudentService,
    GroupService,
  ],
})
export class MarkModule {}
