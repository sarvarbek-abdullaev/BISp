import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaService } from '../../prisma.service';
import { StudentService } from '../students/student.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService, StudentService],
})
export class GroupModule {}
