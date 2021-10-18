import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Mixed } from 'mongoose';
import { FieldGroupDto } from '../dtos/field-group.dto';

@ApiTags('Fields')
export class CreateFieldGroupRequest {
  @ApiProperty()
  label: string;

  @ApiProperty()
  options: Mixed;

  @ApiProperty()
  @Prop({ required: true })
  type: string;

  static getFieldGroupDto(createFieldRequest: CreateFieldGroupRequest) {
    const fieldDto = new FieldGroupDto();
    fieldDto.label = createFieldRequest.label;
    fieldDto.options = createFieldRequest.options;
    fieldDto.type = createFieldRequest.type;
    return fieldDto;
  }
}
