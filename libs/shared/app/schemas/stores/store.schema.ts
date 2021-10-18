import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseItemSchema } from '@shared/app/schemas/base/base-Item.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Workflow } from '@shared/app/schemas/workflows/workflow.schema';
import { Field } from '@shared/app/schemas/fields/field.schema';

export type StoreDocument = Store & Document;

@Schema({ strict: false })
export class Store extends BaseItemSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  storeId: string;

  mobile: string;
  workflow: Workflow;
  currentStepId: string;
}

export class StepData extends BaseItemSchema {
  data: FieldInputData[];
  stepId: string;
  position: number;
}

export class FieldInputData extends BaseItemSchema {
  @ApiProperty()
  label: string;

  @ApiProperty()
  inputValue: any = '';

  @ApiProperty()
  keyName: any;

  @ApiProperty()
  group: FieldInputData[] = [];

  @ApiProperty()
  type: string;

  @ApiProperty()
  position: number;

  static fromField(field: Field) {
    const entity = new FieldInputData();
    entity.label = field.label;
    entity.keyName = field.keyName;
    entity.type = field.type;
    return entity;
  }

  static fromFieldArray(fields: Field[]): FieldInputData[] {
    const entities = [];
    fields.forEach((field) => {
      entities.push(this.fromField(field));
    });
    return entities;
  }
}

export const StoreSchema = SchemaFactory.createForClass(Store);
