import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './common/modules/module.module';
import { CourseModule } from './common/courses/course.module';
import { AuthModule } from './authentication/auth.module';
import { GroupModule } from './common/groups/group.module';
import { AdminModule } from './common/admins/admin.module';
import { TeacherModule } from './common/teachers/teacher.module';
import { StudentModule } from './common/students/student.module';
import { StudentGroupModule } from './common/studentGroups/studentGroup.module';
import { ProductModule } from './common/products/product.module';
import { EnrollmentModule } from './common/enrollments/enrollment.module';
import { ExamModule } from './common/exams/exam.module';
import { MarkModule } from './common/marks/mark.module';

@Module({
  imports: [
    StudentModule,
    ModuleModule,
    AdminModule,
    TeacherModule,
    CourseModule,
    AuthModule,
    GroupModule,
    StudentGroupModule,
    ProductModule,
    EnrollmentModule,
    ExamModule,
    MarkModule,
  ],
  controllers: [AppController],
  providers: [AppService, StudentModule],
})
export class AppModule {}
