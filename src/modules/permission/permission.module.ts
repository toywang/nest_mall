import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UmsAdminRoleRelation } from './entities/umsAdminRoleRelation.entity';
import { UmsMenu } from './entities/umsMenu.entity';
import { UmsRole } from './entities/umsRole.entity';
import { UmsRoleMenuRelation } from './entities/umsRoleMenuRelation.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UmsAdminRoleRelation,
      UmsMenu,
      UmsRole,
      UmsRoleMenuRelation,
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
