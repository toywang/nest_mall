import { Module } from '@nestjs/common';
import { FlashService } from './flash.service';
import { FlashController } from './flash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flash } from './entities/flash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flash])],

  controllers: [FlashController],
  providers: [FlashService],
})
export class FlashModule {}
