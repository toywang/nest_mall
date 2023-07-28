import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configurations from './config/configurations';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// 中间件
import { CorsMiddleware } from '@middlewares/cors.middleware';
import { OriginMiddleware } from '@middlewares/origin.middleware';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleModule } from '@modules/role/role.module';
import { RedisCacheModule } from '@modules/redis-cache/redis-cache.module';
import { RedisCacheService } from './modules/redis-cache/redis-cache.service';
import { MenuModule } from './modules/menu/menu.module';
import { ResourceCategoryModule } from './modules/resource-category/resource-category.module';
import { ResourceModule } from './modules/resource/resource.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { UploadModule } from './modules/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const businessModules = [AuthModule, UserModule, PermissionModule, RoleModule];
const libModules = [
  ConfigModule.forRoot({
    ignoreEnvFile: false,
    cache: true,
    load: [configurations],
    isGlobal: true,
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory: (configService: ConfigService) => {
      console.log('configService.get', configService.get('db.mysql'));
      return {
        type: 'mysql',
        entities: ['dist/**/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        logging: true,
        bigNumberStrings: false, //这里为了避免数据库中的bigint类型转成了字符串类型

        ...configService.get('db.mysql'),
      } as TypeOrmModuleOptions;
    },
  }),
  WinstonModule.forRoot({
    transports: [
      new winston.transports.DailyRotateFile({
        dirname: `logs`, // 日志保存的目录
        filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
        datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
        zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
        maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
        maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
        // 记录时添加时间戳信息
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.json(),
        ),
      }),
      new winston.transports.Console(),
    ],
  }),
];
@Module({
  imports: [
    ...libModules,
    ...businessModules,
    RedisCacheModule,
    MenuModule,
    ResourceCategoryModule,
    ResourceModule,
    ProductModule,
    BrandModule,
    ProductCategoryModule,
    UploadModule,
    MulterModule.register({
      storage: diskStorage({
        //文件上传的地址
        destination: path.join(__dirname, '../uploads'),
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = path.extname(file.originalname);
          callback(null, `${name}${fileExtName}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public/uploaded'),
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisCacheService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes({
      path: '(.*)?',
      method: RequestMethod.ALL,
    });
  }
}
