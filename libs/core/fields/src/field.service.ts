import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { slugifyConfig } from 'apps/admin/src/config/slugify.config';
import slugify from 'slugify';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { FieldRepository } from './field.repository';
import { FieldDto } from './dtos/field.dto';
import { reservedKeywordsForField } from 'apps/admin/src/constant/fields/fields.constant';

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

  async createOrUpdate(fieldDto: FieldDto): Promise<Field> {
    if (!fieldDto.keyName) {
      return await this.create(fieldDto);
    }
    return await this.update(fieldDto);
  }

  async create(fieldDto: FieldDto): Promise<Field> {
    fieldDto.keyName = slugify(fieldDto.label, slugifyConfig);
    fieldDto.keyName = reservedKeywordsForField.some(
      (keywords) => keywords === fieldDto.keyName,
    )
      ? slugify(fieldDto.keyName + this.generateRandomLetter(), slugifyConfig)
      : fieldDto.keyName;
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

  async update(fieldDto: FieldDto): Promise<Field> {
    console.log('Updating field');
    const field = await this.fieldRepository.findOne({
      keyName: fieldDto.keyName,
    });
    console.log(fieldDto.keyName);
    if (!field) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Field not exist with this keyName',
          message: 'Field not exist with this keyName',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    console.log('updating field');
    console.log(fieldDto.expression);
    console.log(fieldDto.expression);
    return await this.fieldRepository.updateObj(fieldDto, fieldDto.keyName);
  }

  async getFields(): Promise<any[]> {
    return await this.fieldRepository.find({});
  }
  async createField(fieldDto: FieldDto): Promise<Field> {
    return await this.fieldRepository.create(fieldDto);
  }

  private generateRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return ' ' + alphabet[Math.floor(Math.random() * alphabet.length)];
  }
}
