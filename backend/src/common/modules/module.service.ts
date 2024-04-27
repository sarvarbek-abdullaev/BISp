import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Exam, Module } from '@prisma/client';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async getAllModules(): Promise<Module[]> {
    return this.prisma.module.findMany({
      include: {
        course: true,
      },
    });
  }

  async getModuleById(id: string): Promise<Module> {
    return this.prisma.module.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
      },
    });
  }

  async getExamsByModuleId(id: string): Promise<Exam[]> {
    const module = await this.prisma.module.findFirst({
      where: {
        id,
      },
      include: {
        exams: true,
      },
    });

    return module?.exams;
  }

  async updateModuleById(id: string, moduleData): Promise<Module> {
    const prismaData = {
      ...moduleData,
    };

    delete prismaData.courseId;
    delete prismaData.teacherId;

    if (!!moduleData.courseId) {
      prismaData.course = {
        connect: {
          id: moduleData.courseId,
        },
      };
    } else {
      prismaData['course'] = {
        disconnect: true,
      };
    }

    if (!!moduleData.teacherId) {
      prismaData['teacher'] = {
        connect: {
          id: moduleData.teacherId,
        },
      };
    } else {
      prismaData['teacher'] = {
        disconnect: true,
      };
    }

    return this.prisma.module.update({
      where: {
        id,
      },
      data: prismaData,
    });
  }

  async createModule(moduleData): Promise<Module> {
    const prismaData = {
      ...moduleData,
    };

    delete prismaData.courseId;
    delete prismaData.teacherId;

    if (!!moduleData.courseId) {
      prismaData.course = {
        connect: {
          id: moduleData.courseId,
        },
      };
    }

    if (!!moduleData.teacherId) {
      prismaData.teacher = {
        connect: {
          id: moduleData.teacherId,
        },
      };
    }

    return this.prisma.module.create({
      data: prismaData,
    });
  }

  async deleteModuleById(id: string): Promise<Module> {
    return this.prisma.module.delete({
      where: {
        id,
      },
    });
  }
}
