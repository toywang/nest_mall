import { Injectable } from '@nestjs/common';
import { CreateReturnApplyDto } from './dto/create-return-apply.dto';
import { UpdateReturnApplyDto } from './dto/update-return-apply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnApply } from './entities/return-apply.entity';
import { Repository } from 'typeorm';
import { BasePageDto } from '@src/common/BasePageDto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class ReturnApplyService {
  constructor(
    @InjectRepository(ReturnApply)
    private raRepository: Repository<ReturnApply>,
  ) {}

  /**
   * 查询  分页
   * @param dto
   * @returns
   */
  async getPageList(dto: SearchDto) {
    const { pageSize, pageNum, id, status, createTime, handleMan, handleTime } =
      dto;

    const queryFilter: any = {};
    if (id) {
      queryFilter.id = id;
    }
    if (status) {
      queryFilter.status = status;
    }
    if (createTime) {
      queryFilter.createTime = createTime;
    }
    if (handleMan) {
      queryFilter.handleMan = handleMan;
    }
    if (handleTime) {
      queryFilter.handleTime = handleTime;
    }
    const res = await this.raRepository.findAndCount({
      where: queryFilter,
      // 排序
      order: { createTime: 'DESC' },
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }

  async findOne(id: string) {
    const res = await this.raRepository.findOne({ id: id });
    return res;
  }

  /**
   * 修改退换货状态
   * @param id
   * @param updateReturnApplyDto
   * @returns
   */

  async update(id: string, updateReturnApplyDto: any) {
    const {
      companyAddressId,
      handleMan,
      handleNote,
      receiveMan,
      receiveNote,
      returnAmount,
      status,
    } = updateReturnApplyDto;
    const model = await this.raRepository.findOne({ id: id });
    if (status == 1) {
      //确认退货
      model.status = status;
      model.companyAddressId = companyAddressId;
      model.handleTime = new Date();
      model.returnAmount = returnAmount;
      model.handleMan = handleMan;
      model.handleNote = handleNote;
    } else if (status == 2) {
      //完成退货
      model.status = status;
      model.companyAddressId = companyAddressId;
      model.receiveTime = new Date();
      model.receiveMan = receiveMan;
      model.receiveNote = receiveNote;
    } else if (status == 3) {
      //拒绝退货
      model.status = status;
      model.handleTime = new Date();
      model.handleMan = handleMan;
      model.handleNote = handleNote;
    }
    return await this.raRepository.save(model);
  }

  /**
   * 批量删除
   * @param
   * @param
   * @returns
   */
  async batchDelete(ids: string) {
    const idst = ids.split(',');
    const result = await this.raRepository.delete(idst);

    return result;
  }
}
