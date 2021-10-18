import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FieldGroup,
  FieldGroupSchema,
} from '@shared/app/schemas/fields/field-group.schema';
import { Field, FieldSchema } from '@shared/app/schemas/fields/field.schema';
import { FieldController } from './field.controller';
import { FieldRepository } from './field.repository';
import { FieldService } from './field.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    MongooseModule.forFeature([
      { name: FieldGroup.name, schema: FieldGroupSchema },
    ]),
  ],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [],
})
export class FieldModule {}
