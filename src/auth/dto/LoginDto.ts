import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String })
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
