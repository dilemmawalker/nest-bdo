import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Validation } from '@shared/app/schemas/validation/validation.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { ValidationDto } from './dtos/validation.dto';

@Injectable()
export class ValidationRepository {
  constructor(
    @InjectModel(Validation.name)
    private readonly validationModel: Model<Validation>,
  ) {}

  async create(validationDto: ValidationDto): Promise<Validation> {
    const newValidation = new this.validationModel(validationDto);
    return await newValidation.save();
  }

  async findOne(
    validationFilterQuery: FilterQuery<Validation>,
  ): Promise<Validation> {
    return await this.validationModel.findOne(validationFilterQuery);
  }

  async findOneAndUpdate(
    validationFilterQuery: FilterQuery<Validation>,
    validationDto: ValidationDto,
  ): Promise<Validation> {
    return await this.validationModel.findOneAndUpdate(
      validationFilterQuery,
      validationDto,
      {
        new: true,
      },
    );
  }

  async findAll(): Promise<Validation[]> {
    return await this.validationModel.find({});
  }

  async findMany(validationKeys: Types.ObjectId[]): Promise<Validation[]> {
    return await this.validationModel.find({
      _id: { $in: validationKeys },
    });
  }
}
