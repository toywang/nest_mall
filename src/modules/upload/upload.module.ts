// upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { OssService } from './oss.service';
@Module({
  imports: [
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join(__dirname, '../images'),
        destination: join('./public/uploaded'),
        filename: (req, file, callback) => {
          return callback(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, OssService],
})
export class UploadModule {}
