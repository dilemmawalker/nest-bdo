import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Validation } from '@shared/app/schemas/validation/validation.schema';
import { FilterQuery, Model } from 'mongoose';
import { ValidationDto } from './dtos/validation.dto';

@Injectable()
export class ValidationRepository {
  constructor(
    @InjectModel(Validation.name)
    private readonly validationModel: Model<Validation>,
  ) {}

  async create(validationDto: ValidationDto): Promise<Validation> {
    const newValidation = new this.validationModel(validationDto);
    await newValidation.save();
    return newValidation;
  }

  async findOne(
    validationFilterQuery: FilterQuery<Validation>,
  ): Promise<Validation> {
    return await this.validationModel.findOne({
      name: validationFilterQuery.name,
    });
  }

  async findOneAndUpdate(
    validationFilterQuery: FilterQuery<Validation>,
    validationDto: ValidationDto,
  ): Promise<Validation> {
    return await this.validationModel.findOneAndUpdate(
      {
        name: validationFilterQuery.name,
      },
      validationDto,
      {
        new: true,
      },
    );
  }

  async findAll(): Promise<Validation[]> {
    return await this.validationModel.find({});
  }
}
