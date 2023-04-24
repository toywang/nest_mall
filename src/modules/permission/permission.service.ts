import { Injectable } from '@nestjs/common';
import { UmsAdminRoleRelation } from './entities/umsAdminRoleRelation.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UmsRole } from './entities/umsRole.entity';
import { UmsRoleMenuRelation } from './entities/umsRoleMenuRelation.entity';
import { UmsMenu } from './entities/umsMenu.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UmsAdminRoleRelation)
    private menuRepository: Repository<UmsAdminRoleRelation>,
  ) {}
  /**
   * 查询用户对应的菜单
   * @param adminId
   * @returns
   */
  async getMenuList(adminId: string) {
    const sql = await getConnection()
      .createQueryBuilder(UmsAdminRoleRelation, 'menuArray')
      .leftJoinAndSelect(UmsRole, 'umsRole', 'menuArray.roleId = umsRole.id')
      .leftJoinAndSelect(UmsRoleMenuRelation, 'rmr', 'umsRole.id = rmr.roleId')
      .leftJoinAndSelect(UmsMenu, 'um', 'rmr.menuId = um.id')
      .where('menuArray.adminId = :adminId', { adminId: adminId })
      .select(
        `
        um.id as id,
        um.title as title,
        um.createTime as createTime, 
        um.name as name, 
        um.parentId as parentId,
        um.icon as icon,
        um.level as level,
        um.hidden as hidden,
        um.sort as sort
      `,
      )
      .getRawMany();
    return sql;
  }
}
