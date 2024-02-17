import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exam } from '@prisma/client';

@Controller('exams')
export class ExamController {
  constructor(private moduleService: ExamService) {}

  @Get()
  async getAllExams() {
    return this.moduleService.getAllExams();
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    return this.moduleService.getExamById(id);
  }

  @Post()
  async createExam(@Body() examData: Exam) {
    return this.moduleService.createExam(examData);
  }

  @Put(':id')
  async updateExamById(@Param('id') id: string, @Body() examData: Exam) {
    return this.moduleService.updateExamById(id, examData);
  }

  @Delete(':id')
  async deleteExamById(@Param('id') id: string) {
    return this.moduleService.deleteExamById(id);
  }
}
