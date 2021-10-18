import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FieldGroup } from '@shared/app/schemas/fields/field-group.schema';
import { Field } from '@shared/app/schemas/fields/field.schema';
import { FieldGroupDto } from './dtos/field-group.dto';
import { FieldDto } from './dtos/field.dto';

@Injectable()
export class FieldRepository {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(FieldGroup.name) private fieldGroupModel: Model<FieldGroup>,
  ) {}

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

  async createFieldGroup(fieldGroupDto: FieldGroupDto): Promise<FieldGroup> {
    const newField = new this.fieldGroupModel(fieldGroupDto);
    return await newField.save();
  }

  async findFieldGroup(
    fieldGroupFilterQuery: FilterQuery<Field>,
  ): Promise<FieldGroup[]> {
    return await this.fieldGroupModel.find({});
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
