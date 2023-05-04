import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async cacheSet(key: string, value: string, ttl?: number) {
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      console.log('cacheSet', error);
    }
  }

  async cacheGet(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
}
