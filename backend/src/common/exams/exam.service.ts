import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Exam, Module } from '@prisma/client';

interface ExamWithModule extends Exam {
  module: Module;
}

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async getAllExams(): Promise<Exam[]> {
    return this.prisma.exam.findMany({
      include: {
        module: true,
      },
    });
  }

  async getExamById(id: string): Promise<ExamWithModule> {
    return this.prisma.exam.findUnique({
      where: {
        id,
      },
      include: {
        module: true,
      },
    });
  }

  async updateExamById(id: string, examData): Promise<Exam> {
    const prismaData = {
      ...examData,
    };

    delete prismaData.moduleId;

    if (!!examData.moduleId) {
      prismaData['module'] = {
        connect: {
          id: examData.moduleId,
        },
      };
    } else {
      prismaData['module'] = {
        disconnect: true,
      };
    }

    return this.prisma.exam.update({
      where: {
        id,
      },
      data: prismaData,
    });
  }

  async createExam(examData): Promise<Exam> {
    const prismaData = {
      ...examData,
    };

    delete prismaData.moduleId;

    if (!!examData.moduleId) {
      prismaData['module'] = {
        connect: {
          id: examData.moduleId,
        },
      };
    }

    return this.prisma.exam.create({
      data: prismaData,
    });
  }

  async deleteExamById(id: string): Promise<Exam> {
    return this.prisma.exam.delete({
      where: {
        id,
      },
    });
  }
}
