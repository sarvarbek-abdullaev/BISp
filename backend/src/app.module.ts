import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ModuleModule } from './module/module.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './authentication/auth.module';
import { GroupModule } from './group/group.module';
import { StudentGroupModule } from './studentGroup/studentGroup.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    ModuleModule,
    CourseModule,
    AuthModule,
    GroupModule,
    StudentGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, StudentModule],
})
export class AppModule {}
