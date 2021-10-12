import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Field } from '../../schemas/fields/field.schema';
import { FieldDto } from './dtos/field.dto';

@Injectable()
export class FieldRepository {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  async findOne(userFilterQuery: FilterQuery<Field>): Promise<Field> {
    return await this.fieldModel.findOne(userFilterQuery);
  }

  async find(fieldFilterQuery: FilterQuery<Field>): Promise<Field[]> {
    return await this.fieldModel.find({});
  }

  async create(fieldDto: FieldDto): Promise<Field> {
    const newField = new this.fieldModel(fieldDto);
    return await newField.save();
  }

  async findOneAndUpdate(
    fieldFilterQuery: FilterQuery<Field>,
    field: Partial<Field>,
  ): Promise<Field> {
    return await this.fieldModel.findOneAndUpdate(
      {
        $or: [
          { label: fieldFilterQuery.label },
          { options: fieldFilterQuery.options },
        ],
      },
      field,
      {
        new: true,
      },
    );
  }
}
