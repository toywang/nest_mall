import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_admin_role_relation')
export class UmsAdminRoleRelation {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'admin_id' })
  @Column({
    name: 'admin_id',
  })
  adminId: number;

  @ApiProperty({ description: 'role_id' })
  @Column({
    name: 'role_id',
  })
  roleId: number;
}
