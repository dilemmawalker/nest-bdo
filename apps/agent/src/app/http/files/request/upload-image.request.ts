import { ApiBody, ApiProperty } from '@nestjs/swagger';
export class UploadImageRequest {
  @ApiProperty()
  storeId: string;

  @ApiProperty()
  keyName: string;

  @ApiProperty()
  test: string;
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
