import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Like, Repository } from 'typeorm';
import { UmsAdminRoleRelation } from '@modules/permission/entities/umsAdminRoleRelation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UmsRole } from '@modules/permission/entities/umsRole.entity';
import { BasePageDto } from '@src/common/BasePageDto';
import { Auth } from '../auth/entities/auth.entity';
import { UpdateRoleDto } from '../auth/dto/UpdateRoleDto';
import { UmsRoleMenuRelation } from '../permission/entities/umsRoleMenuRelation.entity';
import { UmsMenu } from '../permission/entities/umsMenu.entity';
import { RoleInfoDto } from './dto/roleInfoDto';
import { RoleResource } from './entities/role.resource.entity';
import { Resource } from '../resource/entities/resource.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UmsAdminRoleRelation)
    private menuRepository: Repository<UmsAdminRoleRelation>,
    @InjectRepository(Auth)
    private adminRepository: Repository<Auth>,
    @InjectRepository(UmsRole)
    private roleRepository: Repository<UmsRole>,
    @InjectRepository(UmsRoleMenuRelation)
    private rmrRepository: Repository<UmsRoleMenuRelation>,
    @InjectRepository(RoleResource)
    private rrRepository: Repository<RoleResource>,
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
  /**
   * 查询 角色列表 分页
   * @param dto
   * @returns
   */
  async getRolePageList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 name
      queryFilter.name = Like(`%${keyword}%`);
    }
    const res = await this.roleRepository.findAndCount({
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
   * 查询 角色对应的菜单
   * @param roleId
   * @returns
   */
  async getMenuListByRoleId(roleId: string) {
    const sql = await this.rmrRepository
      .createQueryBuilder('rmr')
      .leftJoinAndSelect(UmsMenu, 'mr', 'mr.id = rmr.menuId')
      .where('rmr.roleId = :roleId', { roleId: roleId })
      .addGroupBy('mr.id')
      .select(
        `mr.id as id,
         mr.name as name,
         mr.parentId as parentId,
         mr.createTime as createTime,
         mr.title as title,
         mr.level as level,
         mr.sort as sort,
         mr.icon as icon,
         mr.hidden as hidden
      `,
      )
      .printSql()
      .getRawMany();
    return sql;
  }

  /**
   * 分配菜单给角色
   * @param roleId
   * @menuIds 菜单IDs
   * @returns
   */
  async doAllocMenuByRole(roleId: number, menuIds: Array<number>) {
    const delRes = await this.rmrRepository
      .createQueryBuilder('rmr')
      .delete()
      .from(UmsRoleMenuRelation)
      .where('roleId = :roleId', { roleId: roleId })
      .printSql()
      .execute();
    const values = menuIds.map((value) => {
      return { roleId: roleId, menuId: value };
    });

    const size = await this.rmrRepository
      .createQueryBuilder('rmr')
      .insert()
      .values(values)
      .printSql()
      .execute();
    return '操作成功';
  }

  /**
   * 查询 角色详情
   * @param name
   *
   * @returns
   */
  async queryRoleByName(name: string) {
    const roleInfo: UmsRole = await this.roleRepository.findOne({ name: name });
    return roleInfo;
  }

  /**
   * 修改 角色
   * @param roleId
   *
   * @returns
   */
  async updateRoleInfo(roleId: number, roleDto: RoleInfoDto) {
    const roleInfo: UmsRole = await this.roleRepository.findOne({ id: roleId });
    roleInfo.name = roleDto.name;
    roleInfo.description = roleDto.description;
    roleInfo.status = roleDto.status;
    const result = await this.roleRepository.save(roleInfo);
    return '修改成功';
  }

  /**
   * 修改角色状态
   * @param roleId
   * @param roleDto
   * @returns
   */
  async updateRoleStatus(roleId: number, status: number) {
    const roleInfo: UmsRole = await this.roleRepository.findOne({ id: roleId });
    roleInfo.status = status;
    const result = await this.roleRepository.save(roleInfo);
    return '修改成功';
  }

  /**
   * 新建角色
   * @param roleId
   * @param roleDto
   * @returns
   */
  async createRole(roleInfo: RoleInfoDto) {
    const newRole = new UmsRole();
    newRole.status = roleInfo.status;
    newRole.name = roleInfo.name;
    newRole.description = roleInfo.description;
    newRole.adminCount = 0;
    newRole.sort = 1;
    const result = await this.roleRepository.save(newRole);
    return '新增成功';
  }

  /**
   * 删除角色
   * @param ids
   * @returns
   */
  async deleteRole(ids: number) {
    const result = await this.roleRepository.delete({ id: ids });
    return '删除成功';
  }

  /**
   * 查询 角色对应的资源
   * @param roleId
   * @returns
   */
  async getResourceListById(roleId: number) {
    const sql = await this.rrRepository
      .createQueryBuilder('rr')
      .leftJoinAndSelect(Resource, 'r', 'r.id = rr.resourceId')
      .where('rr.roleId = :roleId', { roleId: roleId })
      .addGroupBy('rr.id')
      .select(
        `r.id as id,
         r.name as name,
         r.url as url,
         r.createTime as createTime,
         r.categoryId as categoryId,
         r.description as description
      `,
      )
      .printSql()
      .getRawMany();
    return sql;
  }

  /**
   * 分配资源给角色
   * @param roleId
   * @menuIds 菜单IDs
   * @returns
   */
  async doAllocResourceByRole(roleId: number, resourceIds: Array<number>) {
    const delRes = await this.rrRepository
      .createQueryBuilder('rr')
      .delete()
      .from(RoleResource)
      .where('roleId = :roleId', { roleId: roleId })
      .printSql()
      .execute();
    const values = resourceIds.map((value) => {
      return { roleId: roleId, resourceId: value };
    });

    const size = await this.rrRepository
      .createQueryBuilder('rr')
      .insert()
      .values(values)
      .printSql()
      .execute();
    return '操作成功';
  }
}
