import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createUser(courseData): Promise<Course> {
    return this.prisma.course.create({
      data: courseData,
    });
  }

  async getAllCourses(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: {
        modules: true,
      },
    });
  }

  async getCourseById(id: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        modules: true,
      },
    });
  }

  async updateCourseById(id: string, courseData): Promise<Course> {
    return this.prisma.course.update({
      where: {
        id,
      },
      data: courseData,
    });
  }

  async deleteCourseById(id: string): Promise<Course> {
    return this.prisma.course.delete({
      where: {
        id,
      },
    });
  }
}
