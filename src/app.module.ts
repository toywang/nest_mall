import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import loadConfig from './config/configurations';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// 中间件
import { CorsMiddleware } from '@middlewares/cors.middleware';
import { OriginMiddleware } from '@middlewares/origin.middleware';

const businessModules = [AuthModule, UserModule];
const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: ['.env'],
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db');

      return {
        type: 'mysql',
        // .env 获取
        host,
        port,
        username,
        password,
        database,
        // entities
        entities: ['dist/**/*.entity{.ts,.js}'],
      };
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
  imports: [...libModules, ...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes({
      path: '(.*)?',
      method: RequestMethod.ALL,
    });
  }
}
