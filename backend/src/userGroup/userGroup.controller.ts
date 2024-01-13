import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserGroup } from '@prisma/client';
import { UserGroupService } from './userGroup.service';

@Controller('student-group')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Get(':id')
  async getUserGroupById(@Param('id') id: string): Promise<UserGroup> {
    return await this.userGroupService.getUserGroupById(id);
  }

  @Put(':id')
  async updateUserGroupById(
    @Param('id') id: string,
    @Body() userGroup: UserGroup,
  ): Promise<UserGroup> {
    return await this.userGroupService.updateUserGroupById(id, userGroup);
  }

  @Post()
  async createUserGroup(
    @Body('userId') userId: string,
    @Body('groupId') groupId: string,
  ): Promise<UserGroup> {
    return await this.userGroupService.createUserGroup(userId, groupId);
  }

  @Delete(':id')
  async deleteUserGroupById(@Param('id') id: string): Promise<UserGroup> {
    return await this.userGroupService.deleteUserGroupById(id);
  }
}
