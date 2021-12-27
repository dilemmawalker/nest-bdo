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

  @ApiProperty({ required: false })
  location: any;

  static getFileDto(
    uploadImageRequest: UploadImageRequest,
    isMultiple = false,
  ) {
    const fileDto = new FileDto();
    fileDto.keyName = uploadImageRequest.keyName;
    fileDto.refId = uploadImageRequest.refId;
    fileDto.isMultiple = isMultiple;
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
          location: {
            type: 'any',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
