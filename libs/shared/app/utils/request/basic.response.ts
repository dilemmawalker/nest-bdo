import { ApiProperty } from '@nestjs/swagger';

export class BasicResponse {
  @ApiProperty()
  status: string;

  static success() {
    const entity = new BasicResponse();
    entity.status = 'success';
    return entity;
  }
}
