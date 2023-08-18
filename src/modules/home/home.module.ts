import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { SubjectService } from '../subject/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],

  controllers: [HomeController],
  providers: [HomeService, SubjectService],
})
export class HomeModule {}
