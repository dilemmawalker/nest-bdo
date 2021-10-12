import { Injectable, NotFoundException } from '@nestjs/common';
import { slugifyConfig } from 'apps/admin/src/config/slugify.config';
import slugify from 'slugify';
import { Field } from '../../schemas/fields/field.schema';
import { FieldDto } from './dtos/field.dto';
import { FieldRepository } from './field.repository';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async findOne(keyName: string): Promise<Field> {
    const Role = await this.fieldRepository.findOne({ keyName: keyName });
    if (Role) {
      return Role;
    }
    throw new NotFoundException();
  }

  async create(fieldDto: FieldDto): Promise<Field> {
    fieldDto.keyName = slugify(fieldDto.label, slugifyConfig);
    return await this.fieldRepository.create(fieldDto);
  }

  async getFields(): Promise<Field[]> {
    return await this.fieldRepository.find({});
  }

  async createField(fieldDto: FieldDto): Promise<Field> {
    return await this.fieldRepository.create(fieldDto);
  }
}
