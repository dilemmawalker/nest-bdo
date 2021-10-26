import { ApiProperty } from '@nestjs/swagger';
import { File } from '@shared/app/schemas/files/file.schema';

export class FileResponse {
  @ApiProperty()
  url: string;

  @ApiProperty()
  keyName: string;

  static fromFile(file: File) {
    const entity = new FileResponse();
    entity.keyName = file.keyName;
    entity.url = file.url;
    return entity;
  }

  static fromFileArray(files: File[]): FileResponse[] {
    const entities = [];
    files.forEach((file) => {
      entities.push(this.fromFile(file));
    });
    return entities;
  }
}
