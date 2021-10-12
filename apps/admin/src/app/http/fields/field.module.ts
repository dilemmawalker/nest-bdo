import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../../schemas/fields/field.schema';
import { FieldController } from './field.controller';
import { FieldRepository } from './field.repository';
import { FieldService } from './field.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [],
})
export class FieldModule {}
