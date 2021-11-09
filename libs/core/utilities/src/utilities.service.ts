import { DataTypesService } from '@dataTypes/data-types/data-types.service';
import { DataTypeDto } from '@dataTypes/data-types/dtos/data-types.dto';
import { Injectable } from '@nestjs/common';
import { DataType } from '@shared/app/schemas/dataTypes/data-types.schema';

@Injectable()
export class UtilitiesService {
  constructor(private readonly dataTypesService: DataTypesService) {}

  async getDataTypes(): Promise<DataType[]> {
    return await this.dataTypesService.getAll();
  }
  async addDataType(dataTypeDto: DataTypeDto): Promise<DataType> {
    return await this.dataTypesService.add(dataTypeDto);
  }
}
