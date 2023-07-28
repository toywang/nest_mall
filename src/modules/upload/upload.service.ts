import { Injectable } from '@nestjs/common';
import { OssService } from './oss.service';
import { extname } from 'path';

@Injectable()
export class UploadService {
  constructor(private readonly ossService: OssService) {}
  // 上传照片
  async getSignature(): Promise<any> {
    try {
      return await this.ossService.getSignature();
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  // 上传照片
  async uploadImage(file: any): Promise<any> {
    try {
      const fileName = `${new Date().getTime() + extname(file.originalname)}`;
      const ossPath = `/img/${fileName}`;
      const ossUrl = await this.ossService.putOssFile(
        ossPath,
        `./public/uploaded/${file.originalname}`,
      );
      return {
        url: ossUrl,
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
