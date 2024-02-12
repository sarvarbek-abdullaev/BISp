import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from '../../dtos';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../../authentication/auth.guard';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  // @UseGuards(JwtAuthGuard)
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
}
