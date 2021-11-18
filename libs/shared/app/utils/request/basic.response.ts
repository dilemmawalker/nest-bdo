import { ApiProperty } from '@nestjs/swagger';

export class BasicResponse {
  @ApiProperty()
  status: string;

  static success(status = 'success') {
    const entity = new BasicResponse();
    entity.status = status;
    return entity;
  }
}
