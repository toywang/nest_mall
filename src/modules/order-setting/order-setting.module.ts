import { Module } from '@nestjs/common';
import { OrderSettingService } from './order-setting.service';
import { OrderSettingController } from './order-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSetting } from './entities/order-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderSetting])],
  controllers: [OrderSettingController],
  providers: [OrderSettingService],
})
export class OrderSettingModule {}
