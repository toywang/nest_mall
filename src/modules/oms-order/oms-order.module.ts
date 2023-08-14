import { Module } from '@nestjs/common';
import { OmsOrderService } from './oms-order.service';
import { OmsOrderController } from './oms-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmsOrder } from './entities/oms-order.entity';
import { OrderOperateHistory } from './entities/order-operate-history.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OmsOrder, OrderOperateHistory, OrderItem]),
  ],
  controllers: [OmsOrderController],
  providers: [OmsOrderService],
})
export class OmsOrderModule {}
