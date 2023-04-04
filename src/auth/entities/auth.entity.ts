import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('ums_admin')
export class Auth {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 500 })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ length: 500 })
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 500 })
  email: string;

  @ApiProperty({ description: '图标' })
  @Column({ length: 500 })
  icon: string;

  @ApiProperty({ description: '昵称' })
  @Column({ length: 500 })
  nick_name: string;

  @ApiProperty({ description: '标记' })
  @Column({ length: 500 })
  note: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Column({
    name: 'login_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: '状态' })
  @Column()
  status: number;

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    console.log('salt', salt, this.password);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
