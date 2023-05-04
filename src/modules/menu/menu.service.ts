import { Injectable } from '@nestjs/common';
import { UmsMenu } from '../permission/entities/umsMenu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePageDto } from '@src/common/BasePageDto';

import { MenuInfoDto } from './dto/menuInfo.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(UmsMenu)
    private menuRepository: Repository<UmsMenu>,
  ) {}

  /**
   * 新建菜单
   * @param menuInfo
   * @returns
   */
  async createMenu(menuInfo: MenuInfoDto) {
    const newMenu = new UmsMenu();
    newMenu.title = menuInfo.title;
    newMenu.name = menuInfo.name;
    newMenu.sort = menuInfo.sort;
    newMenu.hidden = menuInfo.hidden;
    newMenu.icon = menuInfo.icon;
    newMenu.parentId = menuInfo.parentId;
    if (menuInfo.parentId == 0) {
      newMenu.level = 0;
    } else {
      newMenu.level = 1;
    }
    const result = await this.menuRepository.save(newMenu);
    return '新增成功';
  }

  /**
   * 查询 tree菜单列表
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

  /**
   * 查询 parentid对应的列表
   * @param dto
   * @returns
   */
  async getParentList(parentId: number, dto: BasePageDto) {
    const { pageSize, pageNum } = dto;
    const queryFilter: any = {};
    queryFilter.parentId = parentId;

    const res = await this.menuRepository.findAndCount({
      // 查询条件
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

  /**
   * 查询 菜单详情
   * @param id
   *
   * @returns
   */
  async queryMenuById(id: number) {
    const menuInfo: UmsMenu = await this.menuRepository.findOne({ id: id });
    return menuInfo;
  }

  /**
   * 修改 菜单
   * @param ID
   *
   * @returns
   */
  async updateMenuInfo(id: number, infoDto: MenuInfoDto) {
    const menuInfo: UmsMenu = await this.menuRepository.findOne({ id: id });
    menuInfo.name = infoDto.name;
    menuInfo.title = infoDto.title;
    menuInfo.hidden = infoDto.hidden;
    menuInfo.sort = infoDto.sort;
    menuInfo.parentId = infoDto.parentId;
    menuInfo.icon = infoDto.icon;
    const result = await this.menuRepository.save(menuInfo);
    return '修改成功';
  }

  /**
   * 删除菜单
   * @param id
   * @returns
   */
  async deleteMenu(id: number) {
    const result = await this.menuRepository.delete({ id: id });
    return '删除成功';
  }
}
