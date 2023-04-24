import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

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
  @Exclude()
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 20 })
  email: string;

  @ApiProperty({ description: '图标' })
  @Column({ length: 500 })
  icon: string;

  @ApiProperty({ description: '昵称' })
  @Column({ name: 'nick_name', length: 100 })
  nickName: string;

  @ApiProperty({ description: '标记' })
  @Column({ length: 500 })
  note: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @BeforeInsert()
  createDate() {
    // 更新entity前更新LastUpdatedDate
    this.createTime = new Date();
  }
  @Column({
    name: 'login_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  loginTime: Date;

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
