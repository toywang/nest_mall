import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          'configService.get',
          `redis://${configService.get('redis.host')}:${configService.get(
            'redis.port',
          )}/${configService.get('redis.db')}`,
        );
        return {
          store: redisStore,
          password: configService.get('redis.password'),
          url: `redis://${configService.get('redis.host')}:${configService.get(
            'redis.port',
          )}/${configService.get('redis.db')}`,
        } as RedisClientOptions;
      },
    }),
  ],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
