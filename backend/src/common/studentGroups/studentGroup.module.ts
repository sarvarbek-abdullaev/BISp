import { Module } from '@nestjs/common';
import { StudentGroupController } from './studentGroup.controller';
import { StudentGroupService } from './studentGroup.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [StudentGroupController],
  providers: [StudentGroupService, PrismaService],
})
export class StudentGroupModule {}
