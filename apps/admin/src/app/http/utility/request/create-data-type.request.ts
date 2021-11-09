import { UserDto } from '@core/users/dtos/user.dto';
import { DataTypeDto } from '@dataTypes/data-types/dtos/data-types.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('DataTypes')
export class CreateDataTypeRequest {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  status: boolean;

  static getDataTypeDto(createDataTypeRequest: CreateDataTypeRequest) {
    const dataTypeDto = new DataTypeDto();
    dataTypeDto.name = createDataTypeRequest.name;
    dataTypeDto.type = createDataTypeRequest.type;
    dataTypeDto.status = createDataTypeRequest.status;
    return dataTypeDto;
  }
}
