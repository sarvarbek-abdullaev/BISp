import { Module } from '@nestjs/common';
import { AcademicYearController } from './academicYear.controller';
import { AcademicYearService } from './academicYear.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [AcademicYearController],
  providers: [AcademicYearService, PrismaService],
})
export class AcademicYearModule {}
