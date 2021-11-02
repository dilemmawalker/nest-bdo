import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { slugifyConfig } from 'apps/admin/src/config/slugify.config';
import slugify from 'slugify';
import { FieldGroup } from '@shared/app/schemas/fields/field-group.schema';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { FieldRepository } from './field.repository';
import { FieldDto } from './dtos/field.dto';
import { FieldGroupDto } from './dtos/field-group.dto';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async findOne(keyName: string): Promise<Field> {
    const Role = await this.fieldRepository.findOne({ keyName });
    if (Role) {
      return Role;
    }
    throw new NotFoundException();
  }

  async create(fieldDto: FieldDto): Promise<Field> {
    fieldDto.keyName = slugify(fieldDto.label, slugifyConfig);
    const field = await this.fieldRepository.findOne({
      keyName: fieldDto.keyName,
    });
    if (field) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Field already exist',
          message: 'Field already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.fieldRepository.create(fieldDto);
  }

  async createFieldGroup(fieldGroupDto: FieldGroupDto): Promise<FieldGroup> {
    fieldGroupDto.groupKey = slugify(fieldGroupDto.label, slugifyConfig);
    return await this.fieldRepository.createFieldGroup(fieldGroupDto);
  }

  async getFields(): Promise<Field[]> {
    return await this.fieldRepository.find({});
  }

  async getGroupFields(): Promise<FieldGroup[]> {
    return await this.fieldRepository.findFieldGroup({});
  }

  async createField(fieldDto: FieldDto): Promise<Field> {
    return await this.fieldRepository.create(fieldDto);
  }
}
