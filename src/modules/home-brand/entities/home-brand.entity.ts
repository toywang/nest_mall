import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_home_brand', { schema: 'mallshop' })
export class HomeBrand {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'brand_id', nullable: true })
  brandId: string | null;

  @Column('varchar', { name: 'brand_name', nullable: true, length: 64 })
  brandName: string | null;

  @Column('int', { name: 'recommend_status', nullable: true })
  recommendStatus: number | null;

  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;
}
