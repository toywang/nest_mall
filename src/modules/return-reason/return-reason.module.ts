import { Module } from '@nestjs/common';
import { ReturnReasonService } from './return-reason.service';
import { ReturnReasonController } from './return-reason.controller';
import { ReturnReason } from './entities/return-reason.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnReason])],
  controllers: [ReturnReasonController],
  providers: [ReturnReasonService],
})
export class ReturnReasonModule {}
