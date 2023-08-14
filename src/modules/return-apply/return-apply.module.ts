import { Module } from '@nestjs/common';
import { ReturnApplyService } from './return-apply.service';
import { ReturnApplyController } from './return-apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnApply } from './entities/return-apply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnApply])],
  controllers: [ReturnApplyController],
  providers: [ReturnApplyService],
})
export class ReturnApplyModule {}
