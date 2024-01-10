import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ModuleModule } from './module/module.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './authentication/auth.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [StudentModule, ModuleModule, CourseModule, AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService, StudentModule],
})
export class AppModule {}
