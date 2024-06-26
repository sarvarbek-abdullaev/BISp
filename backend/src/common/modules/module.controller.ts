import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Attendance, Module, Student } from '@prisma/client';
import { StudentService } from '../students/student.service';
import { AttendanceClassService } from '../attendanceClasses/attendanceClass.service';

type AttendanceWithClass = Attendance & { attendanceClass: any };

type StudentWithAttendance = Student & { attendances: AttendanceWithClass[] };

type StudentsWithMarks = Student & { marks: any[] };

@Controller('modules')
export class ModuleController {
  constructor(
    private moduleService: ModuleService,
    private studentService: StudentService,
    private attendanceClassService: AttendanceClassService,
  ) {}

  @Get()
  async getAllModules() {
    return this.moduleService.getAllModules();
  }

  @Get(':id')
  async getModuleById(@Param('id') id: string) {
    return this.moduleService.getModuleById(id);
  }

  @Get(':id/students')
  async getStudentsByModuleId(@Param('id') id: string) {
    return this.studentService.getStudentsByModuleId(id);
  }

  @Get(':id/attendance-classes')
  async getAttendanceClassesByModuleId(@Param('id') id: string) {
    return this.attendanceClassService.getAttendanceClassesByModuleId(id);
  }

  @Get(':id/attendances')
  async getAttendanceByModuleId(@Param('id') id: string) {
    const [attendanceClasses, students] = await Promise.all([
      this.attendanceClassService.getAttendanceClassesByModuleId(id),
      this.studentService.getStudentsWithAttendanceByModuleId(id),
    ]);

    const studentsData = students.map((student: StudentWithAttendance) => {
      const attendance = attendanceClasses.map((attendanceClass) => {
        const currentAttendance = student.attendances.find(
          (attendance) => attendance.attendanceClassId === attendanceClass.id,
        );

        if (currentAttendance) return currentAttendance;

        return { attendanceClass };
      });

      return {
        ...student,
        attendances: attendance,
      };
    });

    return {
      studentsData,
      attendanceClasses,
    };
  }

  @Get(':id/assess')
  async getAssessMarksByModuleId(@Param('id') id: string) {
    const [students, exams] = await Promise.all([
      this.studentService.getStudentsWithMarksByModuleId(id),
      this.moduleService.getExamsByModuleId(id),
    ]);

    const studentsData = students.map((student: StudentsWithMarks) => {
      const marks = exams.map((exam) => {
        const currentMark = student.marks.find(
          (mark) => mark?.exam?.id === exam.id,
        );

        if (currentMark) return currentMark;

        return { exam };
      });

      return {
        ...student,
        marks,
      };
    });

    return {
      studentsData,
      exams,
    };
  }

  @Post()
  async createModule(@Body() moduleData: Module) {
    return this.moduleService.createModule(moduleData);
  }

  @Put(':id')
  async updateModuleById(@Param('id') id: string, @Body() moduleData: Module) {
    return this.moduleService.updateModuleById(id, moduleData);
  }

  @Delete(':id')
  async deleteModuleById(@Param('id') id: string) {
    return this.moduleService.deleteModuleById(id);
  }
}
