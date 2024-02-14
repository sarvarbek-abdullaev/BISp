import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentGroup } from '@prisma/client';
import { StudentGroupService } from './studentGroup.service';

@Controller('student-groups')
export class StudentGroupController {
  constructor(private userGroupService: StudentGroupService) {}

  @Get()
  async getAllStudentGroups(): Promise<StudentGroup[]> {
    return await this.userGroupService.getAllStudentGroups();
  }

  @Get(':id')
  async getStudentGroupById(@Param('id') id: string): Promise<StudentGroup> {
    return await this.userGroupService.getStudentGroupById(id);
  }

  @Put(':id')
  async updateStudentGroupById(
    @Param('id') id: string,
    @Body() userGroup: StudentGroup,
  ): Promise<StudentGroup> {
    return await this.userGroupService.updateStudentGroupById(id, userGroup);
  }

  @Post('manage')
  async updateStudentGroups(
    @Body('studentGroups') userGroups: StudentGroup[],
    @Body('deletedIds') deletedIds: string[],
  ): Promise<StudentGroup> {
    return await this.userGroupService.updateStudentGroups(
      userGroups,
      deletedIds,
    );
  }

  @Post()
  async createStudentGroup(
    @Body('studentId') studentId: string,
    @Body('groupId') groupId: string,
  ): Promise<StudentGroup> {
    return await this.userGroupService.createStudentGroup(studentId, groupId);
  }

  @Delete(':id')
  async deleteStudentGroupById(@Param('id') id: string): Promise<StudentGroup> {
    return await this.userGroupService.deleteStudentGroupById(id);
  }
}
