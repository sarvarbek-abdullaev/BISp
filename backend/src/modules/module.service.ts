import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Module } from '@prisma/client';

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
    });
  }

  async updateModuleById(id: string, moduleData): Promise<Module> {
    return this.prisma.module.update({
      where: {
        id,
      },
      data: moduleData,
    });
  }

  async createModule(moduleData): Promise<Module> {
    return this.prisma.module.create({
      data: moduleData,
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
