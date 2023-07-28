import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipJwtAuth } from '../auth/constants';

@ApiTags('upload上传')
@Controller('minio/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('policy') // @UseInterceptors( //   FileInterceptor('file', { //     storage: diskStorage({ //       destination: './public/uploaded', //       filename: (_, file, callback) => { //         const fileName = `${ //           new Date().getTime() + extname(file.originalname) //         }`; //         return callback(null, fileName); //       }, //     }), //   }), // )
  @SkipJwtAuth()
  async getSignature() {
    return await this.uploadService.getSignature();
  }

  @Post() // @UseInterceptors( //   FileInterceptor('file', { //     storage: diskStorage({ //       destination: './public/uploaded', //       filename: (_, file, callback) => { //         const fileName = `${ //           new Date().getTime() + extname(file.originalname) //         }`; //         return callback(null, fileName); //       }, //     }), //   }), // )
  @SkipJwtAuth()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log('upload', file); // return this.uploadService.upload();
    return await this.uploadService.uploadImage(file);
  }
  // /**
  //  * 上传图片到 本地 和 oss
  //  * @param body
  //  */
  // @Post('info/uploadImage')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: multer.diskStorage({
  //       destination: (req, file, cb) => {
  //         cb(null, 'D:/oss/image');
  //       },
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async uploadImage(@UploadedFile() file: any): Promise<any> {
  //   return await this.demoService.uploadImage(file);
  // }
}
