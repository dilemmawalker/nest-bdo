import { FileDto } from '@file/file/dtos/file.dto';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
export class UploadImageRequest {
  @ApiProperty()
  storeId: string;

  @ApiProperty()
  keyName: string;

  static getFileDto(uploadImageRequest: UploadImageRequest) {
    const fileDto = new FileDto();
    fileDto.keyName = uploadImageRequest.keyName;
    fileDto.storeId = uploadImageRequest.storeId;
    return fileDto;
  }
}

export const ApiUploadImageRequest =
  (fileName = 'file'): MethodDecorator =>
  (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
          storeId: {
            type: 'string',
          },
          keyName: {
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
