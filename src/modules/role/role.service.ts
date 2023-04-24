import { Injectable } from '@nestjs/common';
import { EntityManager, Like, Repository } from 'typeorm';
import { UmsAdminRoleRelation } from '@modules/permission/entities/umsAdminRoleRelation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UmsRole } from '@modules/permission/entities/umsRole.entity';
import { BasePageDto } from '@src/common/BasePageDto';
import { Auth } from '../auth/entities/auth.entity';
import { UpdateRoleDto } from '../auth/dto/UpdateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UmsAdminRoleRelation)
    private menuRepository: Repository<UmsAdminRoleRelation>,
    @InjectRepository(Auth)
    private adminRepository: Repository<Auth>,
    @InjectRepository(UmsRole)
    private roleRepository: Repository<UmsRole>,
  ) {}
  /**
   * 查询 登录用户可用的菜单和对应的角色
   * @param adminId
   * @returns
   */
  async getRoleListById(adminId: string) {
    const sql = await this.menuRepository
      .createQueryBuilder('menuArray')
      .leftJoinAndSelect(UmsRole, 'umsRole', 'menuArray.roleId = umsRole.id')
      .where('menuArray.adminId = :adminId', { adminId: adminId })
      .select(
        `umsRole.id as id,
         umsRole.name as name
      `,
      )
      .getRawMany();
    return sql;
  }
  /**
   * 查询 用户列表
   * @param dto
   * @returns
   */
  async getAdminList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.username = Like(`%${keyword}%`);
    }
    const res = await this.adminRepository.findAndCount({
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
   * 查询 角色列表
   * @param dto
   * @returns
   */
  async getRoleList() {
    const res = await this.roleRepository.find();
    return res;
  }
  /**
   * 给用户分配角色
   * @param dto
   * @returns
   */
  async updateRole(updateDto: UpdateRoleDto, manager: EntityManager) {
    const { adminId, roleIds } = updateDto;
    const values = roleIds.split(',').map((value) => {
      const obj: any = {};
      obj.adminId = adminId;
      obj.roleId = Number(value);
      return obj;
    });
    console.log('values', values);
    const deleteRes = await manager.delete(UmsAdminRoleRelation, {
      adminId: adminId,
    });
    console.log('values', deleteRes);

    const res = await manager.insert(UmsAdminRoleRelation, values);
    return '保存成功';
  }
}
