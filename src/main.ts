import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

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

  // 添加拦截器
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new ErrorInterceptor(new Reflector(), nestWinston.logger),
    new LoggingInterceptor(nestWinston.logger),
  );
  //创建swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  //启动swagger
  SwaggerModule.setup('mall_doc', app, document);
  await app.listen(3000);
}
bootstrap();
