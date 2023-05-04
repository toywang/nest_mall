import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ type: String, description: '用户头像' })
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty({ type: String, description: '邮箱' })
  @IsEmail({ message: '请输入正确的邮箱' })
  @IsOptional()
  email: string;

  @ApiProperty({ type: String, description: '用户昵称' })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({ type: String, description: '备注' })
  @IsString()
  @IsOptional()
  note: string;
}
