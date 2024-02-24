import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ModulesRegistration, EnrollmentStatus } from '@prisma/client';
import { StudentService } from '../students/student.service';

@Injectable()
export class ModulesRegistrationService {
  constructor(
    private prisma: PrismaService,
    private studentService: StudentService,
  ) {}

  async createModulesRegistration(
    modulesRegistrationData,
  ): Promise<ModulesRegistration> {
    const { profileId, moduleToModuleRegistrations } = modulesRegistrationData;

    const modules = await this.prisma.module.findMany({
      where: {
        id: {
          in: moduleToModuleRegistrations.map((module) => module.moduleId),
        },
      },
    });

    if (modules.length !== moduleToModuleRegistrations.length) {
      throw new BadRequestException(
        'One or more modules ids are invalid or do not exist.',
      );
    }

    const registration = await this.prisma.modulesRegistration.findFirst({
      where: {
        profileId,
        status: EnrollmentStatus.PENDING,
      },
    });

    if (registration) {
      await this.prisma.moduleToModuleRegistration.deleteMany({
        where: {
          modulesRegistrationId: registration.id,
        },
      });

      return this.prisma.modulesRegistration.update({
        where: {
          id: registration.id,
        },
        data: {
          moduleToModuleRegistrations: {
            create: moduleToModuleRegistrations,
          },
        },
      });
    }

    return this.prisma.modulesRegistration.create({
      data: {
        profileId,
        moduleToModuleRegistrations: {
          create: moduleToModuleRegistrations,
        },
      },
    });
  }

  async getAllModulesRegistrations(): Promise<ModulesRegistration[]> {
    return this.prisma.modulesRegistration.findMany({
      include: {
        moduleToModuleRegistrations: {
          select: {
            module: true,
          },
        },
      },
    });
  }

  async getModulesRegistrationById(id: string): Promise<ModulesRegistration> {
    return this.prisma.modulesRegistration.findUnique({
      where: {
        id,
      },
      include: {
        moduleToModuleRegistrations: {
          select: {
            module: true,
          },
        },
      },
    });
  }

  async approveModulesRegistrationById(
    id: string,
  ): Promise<ModulesRegistration> {
    const enrollment = await this.prisma.modulesRegistration.update({
      where: {
        id,
        status: EnrollmentStatus.PENDING,
      },
      data: {
        status: EnrollmentStatus.APPROVED,
      },
    });

    // await this.studentService.setStudentCourse(
    //   enrollment.profileId,
    //   enrollment.moduleToModuleRegistrations[0].moduleId,
    // );

    // await this.studentService

    return enrollment;
  }

  async rejectModulesRegistrationById(
    id: string,
  ): Promise<ModulesRegistration> {
    return this.prisma.modulesRegistration.update({
      where: {
        id,
        status: EnrollmentStatus.PENDING,
      },
      data: {
        status: EnrollmentStatus.CANCELED,
      },
    });
  }

  // async approveModulesRegistrationById(id: string): Promise<ModulesRegistration> {
  //   const enrollment = await this.prisma.registeredModule.update({
  //     where: {
  //       id,
  //       status: EnrollmentStatus.PENDING,
  //     },
  //     data: {
  //       status: EnrollmentStatus.APPROVED,
  //     },
  //   });
  //
  //   await this.studentService.setStudentCourse(
  //     enrollment.studentId,
  //     enrollment.courseId,
  //   );
  //
  //   return enrollment;
  // }
  //
  // async rejectModulesRegistrationById(id: string): Promise<ModulesRegistration> {
  //   return this.prisma.registeredModule.update({
  //     where: {
  //       id,
  //       status: ModulesRegistrationStatus.PENDING,
  //     },
  //     data: {
  //       status: ModulesRegistrationStatus.CANCELED,
  //     },
  //   });
  // }

  async deleteModulesRegistrationById(
    id: string,
  ): Promise<ModulesRegistration> {
    await this.prisma.moduleToModuleRegistration.deleteMany({
      where: {
        modulesRegistrationId: id,
      },
    });

    return this.prisma.modulesRegistration.delete({
      where: {
        id,
      },
    });
  }

  // async deleteAllModulesRegistrations(): Promise<any> {
  //   await this.prisma.moduleToModuleRegistration.deleteMany();
  //   return this.prisma.modulesRegistration.deleteMany();
  // }
}
