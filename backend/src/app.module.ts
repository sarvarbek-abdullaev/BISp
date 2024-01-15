import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './modules/module.module';
import { CourseModule } from './courses/course.module';
import { AuthModule } from './authentication/auth.module';
import { GroupModule } from './groups/group.module';
import { AdminModule } from './admins/admin.module';
import { TeacherModule } from './teachers/teacher.module';
import { StudentModule } from './students/student.module';
import { UserGroupModule } from './userGroups/userGroup.module';

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
