import { Injectable } from '@nestjs/common';
import { DataType } from '@shared/app/schemas/dataTypes/data-types.schema';
import { DataTypeRepository } from './data-types.repository';
import { DataTypeDto } from './dtos/data-types.dto';

@Injectable()
export class DataTypesService {
  constructor(private readonly dataTypeRepository: DataTypeRepository) {}
  async getAll(): Promise<DataType[]> {
    return await this.dataTypeRepository.getAll();
  }
  async add(dataTypeDto: DataTypeDto): Promise<DataType> {
    return await this.dataTypeRepository.create(dataTypeDto);
  }
}
