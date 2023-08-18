import { Injectable } from '@nestjs/common';
import { CreateHomeRecommendSubjectDto } from './dto/create-home-recommend-subject.dto';
import { UpdateHomeRecommendSubjectDto } from './dto/update-home-recommend-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeRecommendSubject } from './entities/home-recommend-subject.entity';
import { Like, Repository } from 'typeorm';
import { SubjectSearchDto } from './dto/subject-search.dto';

@Injectable()
export class HomeRecommendSubjectService {
  constructor(
    @InjectRepository(HomeRecommendSubject)
    private hrsRepository: Repository<HomeRecommendSubject>,
  ) {}

  /**
   * 插入数据
   * @param subjects
   * @returns
   */
  async create(subjects: [any]) {
    const inserts = [];
    subjects.forEach((value) => {
      const homeRecommendSubject = new HomeRecommendSubject();
      homeRecommendSubject.recommendStatus = 1;
      homeRecommendSubject.sort = 0;
      homeRecommendSubject.subjectId = value.subjectId;
      homeRecommendSubject.subjectName = value.subjectName;
      inserts.push(homeRecommendSubject);
    });
    return await this.hrsRepository.insert(inserts);
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: SubjectSearchDto) {
    const { recommendStatus, subjectName, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (subjectName) {
      // 模糊查询 username
      queryFilter.subjectName = Like(`%${subjectName}%`);
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
