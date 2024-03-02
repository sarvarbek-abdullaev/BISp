import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AcademicYearService } from './academicYear.service';
import { AcademicYear } from '@prisma/client';

@Controller('academic-years')
export class AcademicYearController {
  constructor(private moduleService: AcademicYearService) {}

  @Get()
  async getAllAcademicYears() {
    return this.moduleService.getAllAcademicYears();
  }

  @Get(':id')
  async getAcademicYearById(@Param('id') id: string) {
    return this.moduleService.getAcademicYearById(id);
  }

  @Post()
  async createAcademicYear(@Body() academicYearData: AcademicYear) {
    return this.moduleService.createAcademicYear(academicYearData);
  }

  // @Put(':id')
  // async updateAcademicYearById(
  //   @Param('id') id: string,
  //   @Body() academicYearData: AcademicYear,
  // ) {
  //   return this.moduleService.updateAcademicYearById(id, academicYearData);
  // }

  @Delete(':id')
  async deleteAcademicYearById(@Param('id') id: string) {
    return this.moduleService.deleteAcademicYearById(id);
  }
}
