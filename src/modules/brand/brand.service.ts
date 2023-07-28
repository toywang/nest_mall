import { HttpException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BasePageDto } from '@src/common/BasePageDto';
import { Like, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  /**
   * update 品牌
   * @param dto
   * @returns
   */
  async updateBrand(id: number) {
    const brand: Brand = await this.brandRepository.findOne({ id: id });
    return brand;
  }

  /**
   * 查询 品牌
   * @param dto
   * @returns
   */
  async getBrandDetail(id: number) {
    const brand: Brand = await this.brandRepository.findOne({ id: id });
    return brand;
  }

  /**
   * 查询 品牌
   * @param name
   *
   * @returns
   */
  async queryBrandByName(name: string) {
    const brand: Brand = await this.brandRepository.findOne({
      name: name,
    });
    return brand;
  }

  /**
   * 查询 品牌列表
   * @param dto
   * @returns
   */
  async getBrandList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.name = Like(`%${keyword}%`);
    }
    const res = await this.brandRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // 排序
      order: { sort: 'DESC' },
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
   * 新建品牌
   * @param createBrand
   * @returns
   */
  async createBrand(createBrand: CreateBrandDto) {
    const newBrand = new Brand();
    newBrand.bigPic = createBrand.bigPic;
    newBrand.logo = createBrand.logo;
    newBrand.name = createBrand.name;
    newBrand.factoryStatus = createBrand.factoryStatus;
    newBrand.showStatus = createBrand.showStatus;
    newBrand.productCommentCount = 0;
    newBrand.productCount = 0;
    newBrand.sort = createBrand.sort;
    newBrand.firstLetter = createBrand.firstLetter;
    newBrand.brandStory = createBrand.brandStory;
    const result = await this.brandRepository.save(newBrand);
    return result;
  }

  /**
   * 修改
   * @param brandId
   *
   * @returns
   */
  async updateBrandInfo(brandId: number, brandDto: UpdateBrandDto) {
    const brandInfo: Brand = await this.brandRepository.findOne({
      id: brandId,
    });
    brandInfo.bigPic = brandDto.bigPic;
    brandInfo.logo = brandDto.logo;
    brandInfo.name = brandDto.name;
    brandInfo.factoryStatus = brandDto.factoryStatus;
    brandInfo.showStatus = brandDto.showStatus;
    brandInfo.sort = brandDto.sort;
    brandInfo.firstLetter = brandDto.firstLetter;
    brandInfo.brandStory = brandDto.brandStory;
    const result = await this.brandRepository.save(brandInfo);
    return result;
  }

  /**
   * 批量
   * @param brandId
   * @param
   * @returns
   */
  async batchUpdateBransShowStatus(ids: string, showStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.brandRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, showStatus: showStatus });
    });
    const result = await this.brandRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量
   * @param brandId
   * @param
   * @returns
   */
  async batchUpdateBransFactoryStatus(ids: string, factoryStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.brandRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, factoryStatus: factoryStatus });
    });
    const result = await this.brandRepository.save(updatedComment);
    return result;
  }

  /**
   * 删除
   * @param id
   * @returns
   */
  async deleteBrand(id: number) {
    const result = await this.brandRepository.delete({ id: id });
    return result;
  }
}
