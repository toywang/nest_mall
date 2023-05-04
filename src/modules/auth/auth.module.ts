import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '@src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleModule } from '../role/role.module';
import { ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UserModule,
    PermissionModule,
    PassportModule,
    RoleModule,
    RedisCacheModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log('configService.get', configService.get('jwt.secret'));
        return {
          secret: configService.get<string>('jwt.secret'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RedisCacheService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
