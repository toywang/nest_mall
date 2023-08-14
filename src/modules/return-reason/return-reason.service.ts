import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReturnReasonDto } from './dto/create-return-reason.dto';
import { UpdateReturnReasonDto } from './dto/update-return-reason.dto';
import { BasePageDto } from '@src/common/BasePageDto';
import { ReturnReason } from './entities/return-reason.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonResult } from '@src/common/CommonResult';

@Injectable()
export class ReturnReasonService {
  constructor(
    @InjectRepository(ReturnReason)
    private rtRepository: Repository<ReturnReason>,
  ) {}

  async create(createReturnReasonDto: CreateReturnReasonDto) {
    const result = await this.rtRepository.findOne({
      name: createReturnReasonDto.name,
    });
    if (result) {
      throw new HttpException('名称已经存在', HttpStatus.BAD_REQUEST);
    }
    const newM = new ReturnReason();
    newM.name = createReturnReasonDto.name;
    newM.sort = createReturnReasonDto.sort;
    newM.status = createReturnReasonDto.status;
    return await this.rtRepository.save(newM);
  }

  /**
   * 查询  分页
   * @param dto
   * @returns
   */
  async getPageList(dto: BasePageDto) {
    const { pageSize, pageNum } = dto;
    const res = await this.rtRepository.findAndCount({
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

  /**
   *详情
   *
   */
  async findOne(id: number) {
    return await this.rtRepository.findOne({ id: id });
  }

  /**
   * 修改
   * @param id
   * @param updateReturnReasonDto
   * @returns
   */
  async update(id: number, updateReturnReasonDto: UpdateReturnReasonDto) {
    const result = await this.rtRepository.findOne({ id: id });
    result.name = updateReturnReasonDto.name;
    result.sort = updateReturnReasonDto.sort;
    result.status = updateReturnReasonDto.status;
    return await this.rtRepository.save(result);
  }

  /**
   * 批量删除
   * @param
   * @param
   * @returns
   */
  async batchDelete(ids: string) {
    const idst = ids.split(',');
    const result = await this.rtRepository.delete(idst);

    return result;
  }
}
