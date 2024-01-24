import { Module } from '@nestjs/common';
import { UserGroupController } from './userGroup.controller';
import { UserGroupService } from './userGroup.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [UserGroupController],
  providers: [UserGroupService, PrismaService],
})
export class UserGroupModule {}
