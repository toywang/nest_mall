import { Injectable } from '@nestjs/common';
import { CreateHomeAdvertiseDto } from './dto/create-home-advertise.dto';
import { UpdateHomeAdvertiseDto } from './dto/update-home-advertise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeAdvertise } from './entities/home-advertise.entity';
import { Like, Repository } from 'typeorm';
import { SearchAdvertiseDto } from './dto/search-advertise.dto';

@Injectable()
export class HomeAdvertiseService {
  constructor(
    @InjectRepository(HomeAdvertise)
    private hbRepository: Repository<HomeAdvertise>,
  ) {}

  /**
   * 插入数据
   * @param newAd
   * @returns
   */
  async create(newAd: CreateHomeAdvertiseDto) {
    const advertise = new HomeAdvertise();
    advertise.clickCount = 0;
    advertise.orderCount = 0;
    advertise.sort = newAd.sort;
    advertise.name = newAd.name;
    advertise.type = newAd.type;
    advertise.pic = newAd.pic;
    advertise.startTime = newAd.startTime;
    advertise.endTime = newAd.endTime;
    advertise.status = newAd.status;
    advertise.url = newAd.url;
    advertise.note = newAd.note;

    return await this.hbRepository.insert(advertise);
  }

  /**
   *
   * @param newAd
   * @returns
   */
  async update(id, newAd: UpdateHomeAdvertiseDto) {
    const advertise = await this.hbRepository.findOne(id);
    advertise.clickCount = 0;
    advertise.orderCount = 0;
    advertise.sort = newAd.sort;
    advertise.name = newAd.name;
    advertise.type = newAd.type;
    advertise.pic = newAd.pic;
    advertise.startTime = newAd.startTime;
    advertise.endTime = newAd.endTime;
    advertise.status = newAd.status;
    advertise.url = newAd.url;
    advertise.note = newAd.note;

    return await this.hbRepository.save(advertise);
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: SearchAdvertiseDto) {
    const { type, name, endTime, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (name) {
      queryFilter.name = Like(`%${name}%`);
    }
    if (type) {
      queryFilter.type = type;
    }
    const res = await this.hbRepository.findAndCount({
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

  /**
   * findone
   * @param
   * @param
   * @returns
   */
  async findOne(id: string) {
    const result = await this.hbRepository.findOne(id);
    return result;
  }
  /**
   * 修改状态
   * @param
   * @param
   * @returns
   */
  async updateStatus(id: string, status: number) {
    const result = await this.hbRepository.update(id, { status: status });
    return result;
  }

  /**
   * 批量删除
   * @param
   * @param
   * @returns
   */
  async batchDelete(ids: string) {
    const idst = ids.split(',');
    const result = await this.hbRepository.delete(idst);

    return result;
  }
}
