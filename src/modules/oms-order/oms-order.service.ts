import { Injectable } from '@nestjs/common';
import { OrderSearchDto } from './dto/order-search.dto';
import {
  Brackets,
  EntityManager,
  Like,
  Repository,
  getRepository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OmsOrder } from './entities/oms-order.entity';
import { OrderOperateHistory } from './entities/order-operate-history.entity';
import { ReceiverInfo } from './dto/receiverInfo.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OmsOrderService {
  constructor(
    @InjectRepository(OmsOrder)
    private orderRepository: Repository<OmsOrder>,
  ) {}

  /**
   * 查询订单列表  分页
   * @param dto
   * @returns
   */
  async getPageList(dto: OrderSearchDto) {
    const {
      pageSize,
      pageNum,
      orderSn,
      status,
      receiverKeyword,
      orderType,
      sourceType,
      createTime,
    } = dto;

    const res = getRepository(OmsOrder)
      .createQueryBuilder('user')
      .where('user.deleteStatus = 0')
      .andWhere(
        new Brackets((qb) => {
          if (orderSn) {
            return qb.where('user.orderSn = :orderSn', {
              orderSn: orderSn,
            });
          } else {
            return qb;
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (status) {
            return qb.where('user.status = :status', {
              status: status,
            });
          } else {
            return qb;
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (sourceType) {
            return qb.where('user.sourceType = :sourceType', {
              sourceType: sourceType,
            });
          } else {
            return qb;
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (orderType) {
            return qb.where('user.orderType = :orderType', {
              orderType: orderType,
            });
          } else {
            return qb;
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (createTime) {
            return qb.where('user.createTime LIKE :createTime', {
              createTime: `%${createTime}%`,
            });
          } else {
            return qb;
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (receiverKeyword) {
            return qb
              .where('user.receiverName LIKE :receiverName', {
                receiverName: `%${receiverKeyword}%`,
              })
              .orWhere('user.receiverName LIKE :receiverName', {
                receiverPhone: `%${receiverKeyword}%`,
              });
          } else {
            return qb;
          }
        }),
      )
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return res;
  }

  /**
   * 订单详情
   * @param id
   * @returns
   */
  async findOne(id: string) {
    const sql = await this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.orderItemList', 'orderItemList')
      .leftJoinAndSelect('o.historyList', 'historyList')
      .where('o.id = :id', { id: id })
      .printSql()
      .getOne();
    return sql;
  }

  /**
   * 备注订单
   * @param id
   * @param note
   * @param status
   * @param manager
   * @param operateman
   * @returns
   */
  async updateNote(
    id: string,
    note: string,
    status: number,
    manager: EntityManager,
    operateman: string,
  ) {
    const model = await manager.findOne(OmsOrder, { id: id });
    model.note = note;
    model.modifyTime = new Date();
    await manager.save(model);
    const history = new OrderOperateHistory();
    history.orderId = id;
    history.createTime = new Date();
    history.orderStatus = status;
    history.operateMan = operateman;
    history.note = `修改备注信息：${note}`;
    const res = await manager.insert(OrderOperateHistory, history);
    return res;
  }

  async receiverInfo(
    info: ReceiverInfo,
    manager: EntityManager,
    operateman: string,
  ) {
    const model = await this.orderRepository.findOne({ id: info.orderId });
    model.receiverName = info.receiverName;
    model.receiverPhone = info.receiverPhone;
    model.receiverPostCode = info.receiverPostCode;
    model.receiverDetailAddress = info.receiverDetailAddress;
    model.receiverProvince = info.receiverProvince;
    model.receiverCity = info.receiverCity;
    model.receiverRegion = info.receiverRegion;
    model.modifyTime = new Date();

    await manager.save(model);
    const history = new OrderOperateHistory();
    history.orderId = info.orderId;
    history.createTime = new Date();
    history.orderStatus = info.status;
    history.operateMan = operateman;
    history.note = `修改收货人信息`;
    const res = await manager.insert(OrderOperateHistory, history);
    return res;
  }

  /**
   * 批量发货
   * @param
   * @param
   * @returns
   */
  async batchUpdateDelivery(orders: [any]) {
    const ids = orders.map((value) => value.orderId);
    const existComment = await this.orderRepository.findByIds(ids, {
      where: { status: 1 },
    });
    const updatedComment = [];

    existComment.map((el) => {
      const newDelivery = orders.filter((value) => value.orderId == el.id);
      if (newDelivery.length == 1) {
        const delivery = newDelivery[0];

        el.deliverySn = delivery.deliverySn;
        el.deliveryCompany = delivery.deliveryCompany;
        el.status = 2;
        el.deliveryTime = new Date();

        updatedComment.push({
          ...el,
        });
      }
    });
    const result = await this.orderRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量修改删除状态
   * @param
   * @param
   * @returns
   */
  async batchUpdateDeleteStatus(ids: string) {
    const idst = ids.split(',');
    const existComment = await this.orderRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, deleteStatus: 1 });
    });
    const result = await this.orderRepository.save(updatedComment);
    return result;
  }
}
