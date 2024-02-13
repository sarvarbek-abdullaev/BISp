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
import { User } from '@prisma/client';
import { UserDto } from '../../dtos';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.studentService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.studentService.getUserById(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() studentData: User,
  ): Promise<User> {
    return await this.studentService.updateUserById(id, studentData);
  }

  @Post()
  async createUser(@Body() studentData: User): Promise<UserDto> {
    return await this.studentService.createUser(studentData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return await this.studentService.deleteUserById(id);
  }

  @Patch('activate/:id')
  async activateUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.studentService.activateUserById(id);
  }

  @Patch('deactivate/:id')
  async deactivateUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.studentService.deactivateUserById(id);
  }
}
