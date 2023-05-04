import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log('configService.get', configService.get('redis'));
        return {
          store: redisStore,
          ...configService.get('redis'),
        };
      },
    }),
  ],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
