import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GroupService } from '../groups/group.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, JwtService, GroupService],
})
export class StudentModule {}
