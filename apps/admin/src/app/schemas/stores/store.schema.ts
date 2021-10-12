import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseItemSchema } from '@shared/app/schemas/base/base-Item.schema';
import { Document } from 'mongoose';
import { Workflow } from '../workflows/workflow.schema';
import { ApiProperty } from '@nestjs/swagger';

export type StoreDocument = Store & Document;

@Schema({ strict: false })
export class Store extends BaseItemSchema {
  @Prop({ required: true })
  name: string;
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
  inputValue: any;

  @ApiProperty()
  keyName: any;

  @ApiProperty()
  dataType: string;

  @ApiProperty()
  fieldId: string;

  @ApiProperty()
  position: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
