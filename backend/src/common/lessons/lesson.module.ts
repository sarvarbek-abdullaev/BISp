import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService, PrismaService],
})
export class LessonModule {}
