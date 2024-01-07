import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { StudentModule } from './student/student.module';
import { ModuleModule } from './module/module.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [StudentModule, ModuleModule, CourseModule],
  controllers: [AppController],
  providers: [AppService, StudentModule],
})
export class AppModule {}
