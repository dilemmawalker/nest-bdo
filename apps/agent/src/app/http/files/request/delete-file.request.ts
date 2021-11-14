import { FileDto } from '@file/file/dtos/file.dto';
import { ApiProperty } from '@nestjs/swagger';
import { uploadType } from '@shared/constant/upload-type.constant';
export class DeleteFileRequest {
  @ApiProperty()
  url: string;

  @ApiProperty()
  keyName: string;

  @ApiProperty()
  refId: string;

  @ApiProperty({ type: 'string' })
  type: uploadType;

  static getFileDto(deleteFileRequest: DeleteFileRequest) {
    const fileDto = new FileDto();
    fileDto.refId = deleteFileRequest.refId;
    fileDto.url = deleteFileRequest.url;
    fileDto.type = deleteFileRequest.type;
    fileDto.keyName = deleteFileRequest.keyName;
    return fileDto;
  }
}
