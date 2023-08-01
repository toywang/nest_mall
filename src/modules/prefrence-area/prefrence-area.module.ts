import { Module } from '@nestjs/common';
import { PrefrenceAreaService } from './prefrence-area.service';
import { PrefrenceAreaController } from './prefrence-area.controller';
import { PrefrenceArea } from './entities/prefrence-area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PrefrenceArea])],

  controllers: [PrefrenceAreaController],
  providers: [PrefrenceAreaService],
})
export class PrefrenceAreaModule {}
