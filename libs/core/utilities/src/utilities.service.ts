import { DataTypesService } from '@dataTypes/data-types/data-types.service';
import { DataTypeDto } from '@dataTypes/data-types/dtos/data-types.dto';
import { Injectable } from '@nestjs/common';
import { DataType } from '@shared/app/schemas/dataTypes/data-types.schema';
import { REJECTION_REASON_ARRAY } from '@shared/constant/rejection-reason.constant';

@Injectable()
export class UtilitiesService {
  constructor(private readonly dataTypesService: DataTypesService) {}

  async getDataTypes(): Promise<DataType[]> {
    return await this.dataTypesService.getAll();
  }
  getReasonForRejectionArray(): string[] {
    return REJECTION_REASON_ARRAY;
  }
  async addDataType(dataTypeDto: DataTypeDto): Promise<DataType> {
    return await this.dataTypesService.add(dataTypeDto);
  }
}
