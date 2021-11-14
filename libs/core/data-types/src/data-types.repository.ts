import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataType } from '@shared/app/schemas/dataTypes/data-types.schema';
import { Model } from 'mongoose';
import { DataTypeDto } from './dtos/data-types.dto';

@Injectable()
export class DataTypeRepository {
  constructor(
    @InjectModel(DataType.name) private dataTypeModel: Model<DataType>,
  ) {}
  async getAll(): Promise<DataType[]> {
    return await this.dataTypeModel.find({});
  }
  async create(dataTypeDto: DataTypeDto): Promise<DataType> {
    const newFile = new this.dataTypeModel(dataTypeDto);
    return await newFile.save();
  }
}
