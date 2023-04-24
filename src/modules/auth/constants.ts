import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'secretKey', // 不应该暴露出来
  expiresIn: 30, // 30 分钟内过期
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
