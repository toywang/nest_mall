import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_home_recommend_subject', { schema: 'mallshop' })
export class HomeRecommendSubject {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'subject_id', nullable: true })
  subjectId: string | null;

  @Column('varchar', { name: 'subject_name', nullable: true, length: 64 })
  subjectName: string | null;

  @Column('int', { name: 'recommend_status', nullable: true })
  recommendStatus: number | null;

  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;
}
