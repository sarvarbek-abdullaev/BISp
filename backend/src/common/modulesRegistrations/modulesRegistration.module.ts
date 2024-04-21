import { Module } from '@nestjs/common';
import { ModulesRegistrationController } from './modulesRegistration.controller';
import { ModulesRegistrationService } from './modulesRegistration.service';
import { PrismaService } from '../../prisma.service';
import { StudentService } from '../students/student.service';
import { GroupService } from '../groups/group.service';

@Module({
  controllers: [ModulesRegistrationController],
  providers: [
    ModulesRegistrationService,
    PrismaService,
    StudentService,
    GroupService,
  ],
})
export class ModulesRegistrationModule {}
