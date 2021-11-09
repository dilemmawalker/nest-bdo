import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DataType,
  DataTypeSchema,
} from '@shared/app/schemas/dataTypes/data-types.schema';
import { DataTypeRepository } from './data-types.repository';
import { DataTypesService } from './data-types.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataType.name, schema: DataTypeSchema },
    ]),
  ],
  providers: [DataTypesService, DataTypeRepository],
  exports: [DataTypesService, DataTypeRepository],
})
export class DataTypesModule {}
