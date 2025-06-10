import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from './match.decorator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: '确认密码' })
  @IsString()
  @MinLength(6)
  @Match('password', { message: '两次输入的密码不一致' })
  confirmPassword: string;
}
