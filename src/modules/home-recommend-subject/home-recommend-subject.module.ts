import { Module } from '@nestjs/common';
import { HomeRecommendSubjectService } from './home-recommend-subject.service';
import { HomeRecommendSubjectController } from './home-recommend-subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeRecommendSubject } from './entities/home-recommend-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeRecommendSubject])],

  controllers: [HomeRecommendSubjectController],
  providers: [HomeRecommendSubjectService],
})
export class HomeRecommendSubjectModule {}
