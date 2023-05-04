import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_role_resource_relation')
export class RoleResource {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ApiProperty({ description: 'menu_id' })
  @Column({
    type: 'bigint',
    name: 'resource_id',
  })
  resourceId: number;

  @ApiProperty({ description: 'role_id' })
  @Column({
    type: 'bigint',
    name: 'role_id',
  })
  roleId: number;
}
