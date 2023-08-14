import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oms_company_address', { schema: 'mallshop' })
export class CompanyAddress {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', {
    name: 'address_name',
    nullable: true,
    comment: '地址名称',
    length: 200,
  })
  addressName: string | null;

  @Column('int', {
    name: 'send_status',
    nullable: true,
    comment: '默认发货地址：0->否；1->是',
  })
  sendStatus: number | null;

  @Column('int', {
    name: 'receive_status',
    nullable: true,
    comment: '是否默认收货地址：0->否；1->是',
  })
  receiveStatus: number | null;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '收发货人姓名',
    length: 64,
  })
  name: string | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '收货人电话',
    length: 64,
  })
  phone: string | null;

  @Column('varchar', {
    name: 'province',
    nullable: true,
    comment: '省/直辖市',
    length: 64,
  })
  province: string | null;

  @Column('varchar', {
    name: 'city',
    nullable: true,
    comment: '市',
    length: 64,
  })
  city: string | null;

  @Column('varchar', {
    name: 'region',
    nullable: true,
    comment: '区',
    length: 64,
  })
  region: string | null;

  @Column('varchar', {
    name: 'detail_address',
    nullable: true,
    comment: '详细地址',
    length: 200,
  })
  detailAddress: string | null;
}
