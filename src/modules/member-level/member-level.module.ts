import { Module } from '@nestjs/common';
import { MemberLevelService } from './member-level.service';
import { MemberLevelController } from './member-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberLevel } from './entities/member-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberLevel])],
  controllers: [MemberLevelController],
  providers: [MemberLevelService],
})
export class MemberLevelModule {}
