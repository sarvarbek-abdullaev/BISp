import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '@prisma/client';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    return this.groupService.getGroupById(id);
  }

  @Post()
  async createGroup(@Body() moduleData: Group) {
    return this.groupService.createGroup(moduleData);
  }

  @Put(':id')
  async updateGroupById(@Param('id') id: string, @Body() moduleData: Group) {
    return this.groupService.updateGroupById(id, moduleData);
  }

  @Delete(':id')
  async deleteGroupById(@Param('id') id: string) {
    return this.groupService.deleteGroupById(id);
  }
}
