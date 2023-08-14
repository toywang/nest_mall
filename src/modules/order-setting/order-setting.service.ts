import { Injectable } from '@nestjs/common';
import { CreateOrderSettingDto } from './dto/create-order-setting.dto';
import { UpdateOrderSettingDto } from './dto/update-order-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderSetting } from './entities/order-setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderSettingService {
  constructor(
    @InjectRepository(OrderSetting)
    private osRepository: Repository<OrderSetting>,
  ) {}

  async findOne(id: number) {
    const result = await this.osRepository.findOne({ id: id });
    return result;
  }

  async update(id: number, updateOrderSettingDto: UpdateOrderSettingDto) {
    try {
      const result = await this.osRepository.update(
        {
          id: id,
        },
        updateOrderSettingDto,
      );
      return result;
    } catch (error) {
      console.log('更新订单设置报错', error);
    }
  }
}
