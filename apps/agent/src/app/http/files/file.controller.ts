import { FileService } from '@file/file/file.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/app/interceptors/transform.interceptor';
import { FileUploadingUtils } from '@shared/app/utils/class/file-uploading.utils';
import { ResponseUtils } from '@shared/app/utils/class/response.utils';
import { BasicResponse } from '@shared/app/utils/request/basic.response';
import { DeleteFileRequest } from './request/delete-file.request';
import {
  ApiUploadImageRequest,
  UploadImageRequest,
} from './request/upload-image.request';
import { FileResponse } from './response/file.response';

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
  @UseInterceptors(TransformInterceptor)
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
      uploadImageRequest.location,
    );
    return ResponseUtils.success(
      FileResponse.fromFile(fileObj),
      'File uploaded successfully',
    );
  }

  @Post('/upload/document')
  @ApiConsumes('multipart/form-data')
  @ApiUploadImageRequest('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileUploadingUtils.docFileFilter,
    }),
  )
  @UseInterceptors(TransformInterceptor)
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
      uploadImageRequest.location,
    );
    return ResponseUtils.success(
      FileResponse.fromFile(fileObj),
      'Document Uploaded successfully',
    );
  }

  @Post('/delete')
  @UseInterceptors(TransformInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BasicResponse,
  })
  @UseInterceptors(TransformInterceptor)
  public async deleteFile(@Body() deleteFileRequest: DeleteFileRequest) {
    await this.fileService.deleFileObj(
      DeleteFileRequest.getFileDto(deleteFileRequest),
    );
    return ResponseUtils.success(
      BasicResponse.success(),
      'File deleted successfully',
    );
  }

  @Post('/upload/images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: FileUploadingUtils.imageFileFilter,
    }),
  )
  @UseInterceptors(TransformInterceptor)
  public async uploadMultipleFiles(
    @Req() req: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || req.fileValidationError || files.length === 0) {
      throw new BadRequestException('invalid file');
    }
    console.log(files);
    const fileObjs = [];
    for (const file of files) {
      const fileObj = await this.fileService.uploadFile(
        file.buffer,
        FileUploadingUtils.getImageFilename(file.originalname),
        UploadImageRequest.getFileDto(uploadImageRequest, true),
        uploadImageRequest.location,
      );
      fileObjs.push(fileObj);
    }
    return ResponseUtils.success(
      FileResponse.fromFileArray(fileObjs),
      'File uploaded successfully',
    );
  }

  @Post('/upload/documents')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      fileFilter: FileUploadingUtils.docFileFilter,
    }),
  )
  @UseInterceptors(TransformInterceptor)
  public async uploadMultipleDocs(
    @Req() req: any,
    @Body() uploadImageRequest: UploadImageRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files || req.fileValidationError || files.length === 0) {
      throw new BadRequestException('invalid file');
    }
    console.log(files);
    const fileObjs = [];
    for (const file of files) {
      const fileObj = await this.fileService.uploadFile(
        file.buffer,
        FileUploadingUtils.getDocFilename(file.originalname),
        UploadImageRequest.getFileDto(uploadImageRequest, true),
        uploadImageRequest.location,
      );
      fileObjs.push(fileObj);
    }
    return ResponseUtils.success(
      FileResponse.fromFileArray(fileObjs),
      'File uploaded successfully',
    );
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
