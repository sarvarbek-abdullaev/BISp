import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Class } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private prismaService: PrismaService) {}

  async createClass(classData): Promise<Class> {
    return this.prismaService.class.create({
      data: classData,
    });
  }

  async getAllClasses(): Promise<Class[]> {
    return this.prismaService.class.findMany({
      include: {
        module: true,
      },
    });
  }

  async getClassById(id: string): Promise<Class> {
    return this.prismaService.class.findUnique({
      where: {
        id,
      },
      include: {
        module: true,
      },
    });
  }

  async updateClassById(id: string, classData): Promise<Class> {
    const { name } = classData;

    return this.prismaService.class.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async deleteClassById(id: string): Promise<Class> {
    return this.prismaService.class.delete({
      where: {
        id,
      },
    });
  }
}
