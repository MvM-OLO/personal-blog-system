import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('用户')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 201, description: '注册成功' })
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const { confirmPassword, ...userInfo } = userData;
    this.logger.log(JSON.stringify(userData));
    return this.userService.create(userInfo);
  }

  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }
}
