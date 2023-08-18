import { Injectable } from '@nestjs/common';
import { CreateHomeNewProductDto } from './dto/create-home-new-product.dto';
import { UpdateHomeNewProductDto } from './dto/update-home-new-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeNewProduct } from './entities/home-new-product.entity';
import { Like, Repository } from 'typeorm';
import { HomeNewProductSearchDto } from './dto/home-new-product-search.dto';

@Injectable()
export class HomeNewProductService {
  constructor(
    @InjectRepository(HomeNewProduct)
    private hnpRepository: Repository<HomeNewProduct>,
  ) {}

  /**
   * 插入数据
   * @param homeBrandList
   * @returns
   */
  async create(homeBrandList: [any]) {
    const inserts = [];
    homeBrandList.forEach((value) => {
      const homeRecommend = new HomeNewProduct();
      homeRecommend.recommendStatus = 1;
      homeRecommend.sort = 0;
      homeRecommend.productId = value.productId;
      homeRecommend.productName = value.productName;
      inserts.push(homeRecommend);
    });
    return await this.hnpRepository.insert(inserts);
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: HomeNewProductSearchDto) {
    const { recommendStatus, productName, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (productName) {
      // 模糊查询 username
      queryFilter.productName = Like(`%${productName}%`);
    }
    if (recommendStatus) {
      // 模糊查询 username
      queryFilter.recommendStatus = recommendStatus;
    }
    const res = await this.hnpRepository.findAndCount({
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
    const existComment = await this.hnpRepository.findByIds(idst);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, recommendStatus: recommendStatus });
    });
    const result = await this.hnpRepository.save(updatedComment);
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
    const result = await this.hnpRepository.delete(idst);

    return result;
  }

  /**
   * 修改排序
   * @param
   * @param
   * @returns
   */
  async updateSort(id: string, sort: number) {
    const result = await this.hnpRepository.update(id, { sort: sort });
    return result;
  }
}
