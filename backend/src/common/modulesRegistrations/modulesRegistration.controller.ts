import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ModulesRegistration } from '@prisma/client';
import { ModulesRegistrationService } from './modulesRegistration.service';

@Controller('modulesRegistrations')
export class ModulesRegistrationController {
  constructor(private courseService: ModulesRegistrationService) {}

  @Get()
  async getAllModulesRegistrations(): Promise<ModulesRegistration[]> {
    return this.courseService.getAllModulesRegistrations();
  }

  @Get(':id')
  async getModulesRegistrationById(
    @Param('id') id: string,
  ): Promise<ModulesRegistration> {
    return this.courseService.getModulesRegistrationById(id);
  }

  @Post()
  async createModulesRegistration(
    @Body() modulesRegistrationData: ModulesRegistration,
  ): Promise<ModulesRegistration> {
    return this.courseService.createModulesRegistration(
      modulesRegistrationData,
    );
  }

  @Post(':id/approve')
  async approveModulesRegistrationById(
    @Param('id') id: string,
  ): Promise<ModulesRegistration> {
    return this.courseService.approveModulesRegistrationById(id);
  }

  @Post(':id/reject')
  async rejectModulesRegistrationById(
    @Param('id') id: string,
  ): Promise<ModulesRegistration> {
    return this.courseService.rejectModulesRegistrationById(id);
  }

  @Delete(':id')
  async deleteModulesRegistrationById(
    @Param('id') id: string,
  ): Promise<ModulesRegistration> {
    return this.courseService.deleteModulesRegistrationById(id);
  }

  // @Delete()
  // async deleteAllModulesRegistrations(): Promise<ModulesRegistration[]> {
  //   return this.courseService.deleteAllModulesRegistrations();
  // }
}
