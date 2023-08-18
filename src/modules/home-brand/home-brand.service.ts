import { Injectable } from '@nestjs/common';
import { CreateHomeBrandDto } from './dto/create-home-brand.dto';
import { UpdateHomeBrandDto } from './dto/update-home-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeBrand } from './entities/home-brand.entity';
import { Like, Repository } from 'typeorm';
import { HomeSearchBrandDto } from './dto/home-search-brand.dto';

@Injectable()
export class HomeBrandService {
  constructor(
    @InjectRepository(HomeBrand)
    private hbRepository: Repository<HomeBrand>,
  ) {}

  /**
   * 插入数据
   * @param homeBrandList
   * @returns
   */
  async create(homeBrandList: [any]) {
    const inserts = [];
    homeBrandList.forEach((value) => {
      const homeRecommend = new HomeBrand();
      homeRecommend.recommendStatus = 1;
      homeRecommend.sort = 0;
      homeRecommend.brandId = value.brandId;
      homeRecommend.brandName = value.brandName;
      inserts.push(homeRecommend);
    });
    return await this.hbRepository.insert(inserts);
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: HomeSearchBrandDto) {
    const { recommendStatus, brandName, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (brandName) {
      // 模糊查询 username
      queryFilter.brandName = Like(`%${brandName}%`);
    }
    if (recommendStatus) {
      // 模糊查询 username
      queryFilter.recommendStatus = recommendStatus;
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
   * 批量
   * @param
   * @param
   * @returns
   */
  async batchUpdateRecommendStatus(ids: string, recommendStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.hbRepository.findByIds(idst);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, recommendStatus: recommendStatus });
    });
    const result = await this.hbRepository.save(updatedComment);
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

  /**
   * 修改排序
   * @param
   * @param
   * @returns
   */
  async updateSort(id: string, sort: number) {
    const result = await this.hbRepository.update(id, { sort: sort });
    return result;
  }
}
