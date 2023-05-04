import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UmsAdminRoleRelation } from '@modules/permission/entities/umsAdminRoleRelation.entity';
import { UmsRole } from '@modules/permission/entities/umsRole.entity';
import { Auth } from '@modules/auth/entities/auth.entity';
import { UmsRoleMenuRelation } from '../permission/entities/umsRoleMenuRelation.entity';
import { Resource } from '../resource/entities/resource.entity';
import { RoleResource } from './entities/role.resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UmsAdminRoleRelation,
      UmsRole,
      Auth,
      UmsRoleMenuRelation,
      RoleResource,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
