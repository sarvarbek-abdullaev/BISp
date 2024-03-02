import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '@prisma/client';

@Controller('groups')
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

  @Get('student/:id')
  async getGroupsByUserId(@Param('id') userId: string): Promise<Group[]> {
    return this.groupService.getGroupsByUserId(userId);
  }

  @Post()
  async createGroup(@Body() groupData: Group) {
    return this.groupService.createGroup(groupData);
  }

  @Put(':id')
  async updateGroupById(@Param('id') id: string, @Body() groupData: Group) {
    return this.groupService.updateGroupById(id, groupData);
  }

  @Delete(':id')
  async deleteGroupById(@Param('id') id: string) {
    return this.groupService.deleteGroupById(id);
  }

  @Patch('deactivate-by-ids')
  async deactivateGroupsByIds(@Body() ids: string[]) {
    return this.groupService.deactivateGroupsByIds(ids);
  }

  // @Patch('deactivate-by-year')
  // async deactivateGroupsByYear(@Body() year: number) {
  //   return this.groupService.deactivateGroupsByYear(year);
  // }
}
