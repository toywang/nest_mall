import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
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

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
