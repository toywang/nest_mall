import { Injectable } from '@nestjs/common';
import { CreateCouponHistoryDto } from './dto/create-coupon-history.dto';
import { UpdateCouponHistoryDto } from './dto/update-coupon-history.dto';
import { CouponHistory } from './entities/coupon-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CouponHistorySearchDto } from './dto/coupon-history-search.dto';

@Injectable()
export class CouponHistoryService {
  constructor(
    @InjectRepository(CouponHistory)
    private cpRepository: Repository<CouponHistory>,
  ) {}

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: CouponHistorySearchDto) {
    const { useStatus, couponId, orderSn, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (orderSn) {
      queryFilter.orderSn = Like(`%${orderSn}%`);
    }
    if (useStatus) {
      queryFilter.useStatus = useStatus;
    }
    if (couponId) {
      queryFilter.couponId = couponId;
    }
    const res = await this.cpRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }
}
