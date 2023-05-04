import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UmsMenu } from '../permission/entities/umsMenu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(UmsMenu)
    private menuRepository: Repository<UmsMenu>,
  ) {}
  /**
   * 查询 菜单列表
   * @param dto
   * @returns
   */
  async getMenuAllList() {
    const menuList = await this.menuRepository.find();
    const result = this.dealTreeData(0, menuList);
    return result;
  }
  dealTreeData(parent_id: number, list: any) {
    const arr = list?.filter((c: any) => c.parentId == parent_id) || [];
    arr.forEach((item: any) => {
      const children: any = this.dealTreeData(item.id, list);
      if (children?.length) {
        item.children = children;
      } else {
        item.children = [];
      }
    });
    return arr;
  }
}
