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

@Controller('user-group')
export class StudentGroupController {
  constructor(private userGroupService: StudentGroupService) {}

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

  @Post()
  async createStudentGroup(
    @Body('studentId') studentId: string,
    @Body('groupId') groupId: string,
  ): Promise<StudentGroup> {
    return await this.userGroupService.createStudentGroup(studentId, groupId);
  }

  @Delete(':id')
  async deleteStudentById(@Param('id') id: string): Promise<StudentGroup> {
    return await this.userGroupService.deleteStudentGroupById(id);
  }
}
