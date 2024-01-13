import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './authentication/auth.module';
import { GroupModule } from './group/group.module';
import { UserGroupModule } from './userGroup/userGroup.module';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    StudentModule,
    ModuleModule,
    AdminModule,
    TeacherModule,
    CourseModule,
    AuthModule,
    GroupModule,
    UserGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, StudentModule],
})
export class AppModule {}
