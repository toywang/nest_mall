import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_member_level')
export class MemberLevel {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: '是否为默认等级：0->不是；1->是' })
  @Column({ type: 'int', name: 'default_status' })
  defaultStatus: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int', name: 'growth_point' })
  growthPoint: number;

  @ApiProperty({ description: '免运费标准' })
  @Column({ type: 'decimal', name: 'free_freight_point' })
  freeFreightPoint: number;

  @ApiProperty({ description: '每次评价获取的成长值' })
  @Column({ type: 'int', name: 'comment_growth_point' })
  commentGrowthPoint: number;

  @ApiProperty({ description: '是否有免邮特权' })
  @Column({ type: 'int', name: 'priviledge_free_freight' })
  priviledgeFreeFreight: number;

  @ApiProperty({ description: '是否有签到特权' })
  @Column({ type: 'int', name: 'priviledge_sign_in' })
  priviledgeSignIn: number;

  @ApiProperty({ description: '是否有评论特权' })
  @Column({ type: 'int', name: 'priviledge_comment' })
  priviledgeComment: number;

  @ApiProperty({ description: '是否有专享活动特权' })
  @Column({ type: 'int', name: 'priviledge_promotion' })
  priviledgePromotion: number;

  @ApiProperty({ description: '是否有会员价格特权' })
  @Column({ type: 'int', name: 'priviledge_member_price' })
  priviledgeMemberPrice: number;

  @ApiProperty({ description: '是否有生日特权' })
  @Column({ type: 'int', name: 'priviledge_birthday' })
  priviledgeBirthday: number;

  @ApiProperty({ description: '是否有生日特权' })
  @Column({ type: 'varchar', length: 200 })
  note: string;
}
