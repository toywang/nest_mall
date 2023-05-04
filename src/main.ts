import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
import { BadHttpExceptionFilter } from './filters/badException.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors();

  //配置swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('商城API文档') //文档标题
    .setDescription('商城API文档') //文档描述
    .setVersion('1.0') //文档版本
    .addBasicAuth() //鉴权，可以输入token
    .build(); //创建
  app.useGlobalPipes(
    new ValidationPipe({
      // fix parameter escape
      whitelist: true,
    }),
  );
  const nestWinston = app.get('NestWinston');

  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(nestWinston.logger));
  app.useGlobalFilters(new BadHttpExceptionFilter(nestWinston.logger));
  // 添加拦截器
  app.useGlobalInterceptors(new LoggingInterceptor(nestWinston.logger));
  app.useGlobalInterceptors(new TransformInterceptor());
  //创建swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  //启动swagger
  SwaggerModule.setup('mall_doc', app, document);
  await app.listen(3000);
}
bootstrap();
