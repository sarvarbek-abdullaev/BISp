import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: {
        module: true,
      },
    });
  }

  async getEventById(id: string): Promise<Event> {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        module: true,
      },
    });
  }

  async updateEventById(id: string, eventData): Promise<Event> {
    const prismaData = {
      ...eventData,
    };

    if (!eventData.name) {
      throw new ForbiddenException('Event name is required');
    }

    if (!eventData.description) {
      throw new ForbiddenException('Event description is required');
    }

    if (!eventData.startDate) {
      throw new ForbiddenException('Event start date is required');
    }

    if (!eventData.endDate) {
      throw new ForbiddenException('Event end date is required');
    }

    if (eventData.startDate >= eventData.endDate) {
      throw new ForbiddenException(
        'Event start date cannot be greater or equal to end date',
      );
    }

    if (!eventData.moduleId) {
      prismaData['module'] = {
        disconnect: true,
      };
    }

    return this.prisma.event.update({
      where: {
        id,
      },
      data: prismaData,
    });
  }

  async createEvent(eventData): Promise<any> {
    const prismaData = {
      ...eventData,
    };

    if (!eventData.name) {
      throw new ForbiddenException('Event name is required');
    }

    if (!eventData.description) {
      throw new ForbiddenException('Event description is required');
    }

    if (!eventData.startDate) {
      throw new ForbiddenException('Event start date is required');
    }

    if (!eventData.endDate) {
      throw new ForbiddenException('Event end date is required');
    }

    if (eventData.startDate >= eventData.endDate) {
      throw new ForbiddenException(
        'Event start date cannot be greater than end date',
      );
    }

    return this.prisma.event.create({
      data: prismaData,
    });
  }

  async deleteEventById(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
