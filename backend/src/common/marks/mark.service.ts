import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Mark } from '@prisma/client';
import { ExamService } from '../exams/exam.service';
import { StudentService } from '../students/student.service';

@Injectable()
export class MarkService {
  constructor(
    private prisma: PrismaService,
    private examService: ExamService,
    private studentService: StudentService,
  ) {}

  async getAllMarks(): Promise<Mark[]> {
    return this.prisma.mark.findMany({
      include: {
        exam: true,
      },
    });
  }

  async getMarkById(id: string): Promise<Mark> {
    return this.prisma.mark.findUnique({
      where: {
        id,
      },
      include: {
        exam: true,
      },
    });
  }

  async updateMarkById(id: string, markData): Promise<Mark> {
    const prismaData = {
      ...markData,
    };

    if (!markData.mark) {
      throw new ForbiddenException('Mark is required');
    }

    if (!markData.examId) {
      throw new ForbiddenException('ExamId is required');
    }

    if (!markData.studentId) {
      throw new ForbiddenException('StudentId is required');
    }

    const exam = await this.examService.getExamById(markData.examId);

    if (!exam.moduleId) {
      throw new ForbiddenException('Exam is not associated with a module');
    }

    const student = await this.studentService.getStudentById(
      markData.studentId,
    );

    if (!student.courseId) {
      throw new ForbiddenException('Student is not associated with a course');
    }

    if (student.courseId !== exam.module.courseId) {
      throw new ForbiddenException(
        'Exam is not associated with the student course',
      );
    }

    return this.prisma.mark.update({
      where: {
        id,
      },
      data: prismaData,
    });
  }

  async createMark(markData): Promise<any> {
    const prismaData = {
      ...markData,
    };

    if (!markData.mark) {
      throw new ForbiddenException('Mark is required');
    }

    if (!markData.examId) {
      throw new ForbiddenException('ExamId is required');
    }

    if (!markData.studentId) {
      throw new ForbiddenException('StudentId is required');
    }

    const exam = await this.examService.getExamById(markData.examId);

    if (!exam.moduleId) {
      throw new ForbiddenException('Exam is not associated with a module');
    }

    const student = await this.studentService.getStudentById(
      markData.studentId,
    );

    if (!student.courseId) {
      throw new ForbiddenException('Student is not associated with a course');
    }

    if (student.courseId !== exam.module.courseId) {
      throw new ForbiddenException(
        'Exam is not associated with the student course',
      );
    }

    return this.prisma.mark.create({
      data: prismaData,
    });
  }

  async deleteMarkById(id: string): Promise<Mark> {
    return this.prisma.mark.delete({
      where: {
        id,
      },
    });
  }
}
