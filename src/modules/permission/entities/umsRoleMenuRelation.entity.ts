import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_role_menu_relation')
export class UmsRoleMenuRelation {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'menu_id' })
  @Column({
    name: 'menu_id',
  })
  menuId: number;

  @ApiProperty({ description: 'role_id' })
  @Column({
    name: 'role_id',
  })
  roleId: number;
}
