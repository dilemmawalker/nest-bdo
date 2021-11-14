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
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadingUtils } from '@shared/app/utils/class/file-uploading.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import {
  ApiUploadImageRequest,
  UploadImageRequest,
} from './request/upload-image.request';
import { FileResponse } from './response/file.response';

class testUpload {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: File;
}
@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload/image')
  @ApiConsumes('multipart/form-data')
  @ApiUploadImageRequest('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileUploadingUtils.imageFileFilter,
    }),
  )
  public async uploadImage(
    @Req() req: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('invalid file');
    }
    const fileObj = await this.fileService.uploadFile(
      file.buffer,
      FileUploadingUtils.getImageFilename(file.originalname),
      UploadImageRequest.getFileDto(uploadImageRequest),
    );
    console.log(uploadImageRequest);
    return ResponseUtils.success(FileResponse.fromFile(fileObj));
  }

  @Post('/upload/document')
  @ApiConsumes('multipart/form-data')
  @ApiUploadImageRequest('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileUploadingUtils.docFileFilter,
    }),
  )
  public async uploadDoc(
    @Req() req: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('invalid file');
    }
    const fileObj = await this.fileService.uploadFile(
      file.buffer,
      FileUploadingUtils.getDocFilename(file.originalname),
      UploadImageRequest.getFileDto(uploadImageRequest),
    );
    return ResponseUtils.success(FileResponse.fromFile(fileObj));
  }

  // @Post('/multiple-upload')
  // @ApiConsumes('multipart/form-data')
  // @ApiUploadImageRequest('filename')
  // @UseInterceptors(
  //   FileInterceptor('filename', {
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // public async uploadMultipleFiles(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() uploadImageRequest: UploadImageRequest,
  // ) {
  //   const response = [];
  //   files.forEach((file) => {
  //     const res = {
  //       originalname: file.originalname,
  //       filename: file.filename,
  //     };
  //     response.push(res);
  //   });
  //   return response;
  // }
}
