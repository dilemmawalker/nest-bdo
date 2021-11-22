import { FileDto } from '@file/file/dtos/file.dto';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { uploadType } from '@shared/constant/upload-type.constant';
export class UploadImageRequest {
  @ApiProperty()
  refId: string;

  @ApiProperty()
  keyName: string;

  @ApiProperty({ enum: uploadType })
  type: uploadType;

  static getFileDto(uploadImageRequest: UploadImageRequest) {
    const fileDto = new FileDto();
    fileDto.keyName = uploadImageRequest.keyName;
    fileDto.refId = uploadImageRequest.refId;
    return fileDto;
  }
}

export const ApiUploadImageRequest =
  (file = 'file'): MethodDecorator =>
  (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [file]: {
            type: 'string',
            format: 'binary',
          },
          refId: {
            type: 'string',
          },
          keyName: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
