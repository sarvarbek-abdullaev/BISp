import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Lesson } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getAllLessons(): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      include: {
        module: true,
        group: true,
      },
    });
  }

  async getLessonById(id: string): Promise<Lesson> {
    return this.prisma.lesson.findUnique({
      where: {
        id,
      },
      include: {
        module: true,
        group: true,
      },
    });
  }

  async updateLessonById(id: string, lessonData): Promise<Lesson> {
    if (!lessonData.groupId) {
      throw new BadRequestException('Group is required');
    }

    if (!lessonData.moduleId) {
      throw new BadRequestException('Module is required');
    }

    if (!lessonData.endTime) {
      throw new BadRequestException('End time is required');
    }

    if (!lessonData.startTime) {
      throw new BadRequestException('Start time is required');
    }

    if (lessonData.endTime < lessonData.startTime) {
      throw new BadRequestException('End time must be greater than start time');
    }

    if (lessonData.endTime === lessonData.startTime) {
      throw new BadRequestException(
        'End time and start time cannot be the same',
      );
    }

    if (lessonData.endTime > 24 || lessonData.startTime > 24) {
      throw new BadRequestException('Time cannot be greater than 24');
    }

    if (lessonData.endTime < 0 || lessonData.startTime < 0) {
      throw new BadRequestException('Time cannot be less than 0');
    }

    const { groupId, moduleId, endTime, startTime, day } = lessonData;

    return this.prisma.lesson.update({
      where: {
        id,
      },
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        module: {
          connect: {
            id: moduleId,
          },
        },
        endTime,
        startTime,
        day,
      },
    });
  }

  async createLesson(lessonData): Promise<Lesson> {
    if (!lessonData.groupId) {
      throw new BadRequestException('Group is required');
    }

    if (!lessonData.moduleId) {
      throw new BadRequestException('Module is required');
    }

    if (!lessonData.endTime) {
      throw new BadRequestException('End time is required');
    }

    if (!lessonData.startTime) {
      throw new BadRequestException('Start time is required');
    }

    if (lessonData.endTime < lessonData.startTime) {
      throw new BadRequestException('End time must be greater than start time');
    }

    if (lessonData.endTime === lessonData.startTime) {
      throw new BadRequestException(
        'End time and start time cannot be the same',
      );
    }

    if (lessonData.endTime > 24 || lessonData.startTime > 24) {
      throw new BadRequestException('Time cannot be greater than 24');
    }

    if (lessonData.endTime < 0 || lessonData.startTime < 0) {
      throw new BadRequestException('Time cannot be less than 0');
    }

    return this.prisma.lesson.create({
      data: lessonData,
    });
  }

  async deleteLessonById(id: string): Promise<Lesson> {
    return this.prisma.lesson.delete({
      where: {
        id,
      },
    });
  }
}
