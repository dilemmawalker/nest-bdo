import { ApiProperty } from '@nestjs/swagger';
import { DataType } from '@shared/app/schemas/dataTypes/data-types.schema';

export class DataTypeResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: boolean;

  static fromDataType(dataType: DataType) {
    const entity = new DataTypeResponse();
    entity.name = dataType.name;
    entity.type = dataType.type;
    entity.status = dataType.status;
    return entity;
  }

  static fromDataTypeArray(dataTypes: DataType[]): DataTypeResponse[] {
    const entities = [];
    dataTypes.forEach((dataType) => {
      entities.push(this.fromDataType(dataType));
    });
    return entities;
  }
}
