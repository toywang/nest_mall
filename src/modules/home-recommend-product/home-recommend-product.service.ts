import { Injectable } from '@nestjs/common';
import { CreateHomeRecommendProductDto } from './dto/create-home-recommend-product.dto';
import { UpdateHomeRecommendProductDto } from './dto/update-home-recommend-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeRecommendProduct } from './entities/home-recommend-product.entity';
import { Like, Repository } from 'typeorm';
import { ProductSearchDto } from './dto/product-search.dto';

@Injectable()
export class HomeRecommendProductService {
  constructor(
    @InjectRepository(HomeRecommendProduct)
    private hrsRepository: Repository<HomeRecommendProduct>,
  ) {}

  /**
   * 插入数据
   * @param products
   * @returns
   */
  async create(products: [any]) {
    const inserts = [];
    products.forEach((value) => {
      const homeRecommend = new HomeRecommendProduct();
      homeRecommend.recommendStatus = 1;
      homeRecommend.sort = 0;
      homeRecommend.productId = value.productId;
      homeRecommend.productName = value.productName;
      inserts.push(homeRecommend);
    });
    return await this.hrsRepository.insert(inserts);
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: ProductSearchDto) {
    const { recommendStatus, productName, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (productName) {
      queryFilter.productName = Like(`%${productName}%`);
    }
    if (recommendStatus) {
      // 模糊查询 username
      queryFilter.recommendStatus = recommendStatus;
    }
    const res = await this.hrsRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: false,
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
    const existComment = await this.hrsRepository.findByIds(idst);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, recommendStatus: recommendStatus });
    });
    const result = await this.hrsRepository.save(updatedComment);
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
    const result = await this.hrsRepository.delete(idst);

    return result;
  }

  /**
   * 修改排序
   * @param
   * @param
   * @returns
   */
  async updateSort(id: string, sort: number) {
    const result = await this.hrsRepository.update(id, { sort: sort });
    return result;
  }
}
