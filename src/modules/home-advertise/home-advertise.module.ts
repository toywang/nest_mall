import { Module } from '@nestjs/common';
import { HomeAdvertiseService } from './home-advertise.service';
import { HomeAdvertiseController } from './home-advertise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeAdvertise } from './entities/home-advertise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeAdvertise])],

  controllers: [HomeAdvertiseController],
  providers: [HomeAdvertiseService],
})
export class HomeAdvertiseModule {}
