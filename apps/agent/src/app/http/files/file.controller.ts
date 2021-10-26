import { FileService } from '@file/file/file.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { imageFileFilter } from '@shared/app/utils/function/helper.function';
import {
  ApiUploadImageRequest,
  UploadImageRequest,
} from './request/upload-image.request';

class testUpload {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: File;
}
@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @ApiConsumes('multipart/form-data')
  async getWorkflow(
    @UploadedFile() file: Express.Multer.File,
    @Body() testUpload: testUpload,
  ): Promise<any> {
    return 'ok';
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiUploadImageRequest('filename')
  @UseInterceptors(
    FileInterceptor('filename', {
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(
    @Req() req: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(uploadImageRequest);
    if (!file || req.fileValidationError) {
      throw new BadRequestException('invalid file');
    }
    return await this.fileService.uploadFile(file.buffer, file.originalname);
  }

  @Post('/multiple-upload')
  @ApiConsumes('multipart/form-data')
  @ApiUploadImageRequest('filename')
  @UseInterceptors(
    FileInterceptor('filename', {
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() uploadImageRequest: UploadImageRequest,
  ) {
    const response = [];
    files.forEach((file) => {
      const res = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(res);
    });
    return response;
  }
}
