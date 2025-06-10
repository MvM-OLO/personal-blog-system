/**
 * 认证服务模块
 * 负责处理用户认证、登录和JWT令牌生成等功能
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // 用户服务，用于查询用户信息
    private readonly jwtService: JwtService, // JWT服务，用于生成和验证令牌
  ) {}

  /**
   * 验证用户凭据
   * @param username 用户名
   * @param pass 密码
   * @returns 如果验证成功返回用户信息（不包含密码），否则返回null
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    // 检查用户是否存在且密码是否匹配
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // 从返回结果中移除密码字段
      return result;
    }
    return null;
  }

  /**
   * 用户登录
   * @param user 用户信息
   * @returns 包含访问令牌的对象
   */
  async login(user: any) {
    // 创建JWT载荷，包含用户名和用户ID
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload); // 生成JWT令牌
  }
}
