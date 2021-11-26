import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseItemSchema } from '@shared/app/schemas/base/base-Item.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expression } from '../fields/expression.schema';

export type StoreDocument = Store & Document;

@Schema({ strict: false, versionKey: false })
export class Store {
  @Prop({ required: true })
  store_name: string;

  @Prop({ required: true, unique: true })
  storeId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  owner_name: string;

  @Prop()
  mobile: string;

  @Prop()
  remark: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  workflowKey: string;

  @Prop({ required: true })
  currentStepId: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
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
  keyName: string;

  @ApiProperty()
  options: any;

  @ApiProperty()
  expression: Expression;

  @ApiProperty()
  group: FieldInputData[] = [];

  @ApiProperty()
  isEditable = true;

  @ApiProperty()
  type: string;

  @ApiProperty()
  position: number;

  static fromField(field: any) {
    const entity = new FieldInputData();
    entity.label = field.label;
    entity.expression = field.get('expression') || null;
    entity.keyName = field.keyName;
    entity.type = field.type;
    entity.options = field.options;
    entity.inputValue = this.getDefaultInputValue(field.options, field);
    entity.isEditable = field.isEditable;
    if (field.groups && field.groups.length != 0) {
      entity.group = this.fromFieldArray(field.groups);
    }
    return entity;
  }
  static getDefaultInputValue(options, field) {
    let value: any = '';
    if (options) {
      options.forEach((option) => {
        if (option['key'] == 'defaultValue') {
          value = option['value'];
        }
      });
    }
    if (field.type == 'multiImage') {
      value = [];
    }
    return value;
  }

  static fromFieldArray(fields: any[]): FieldInputData[] {
    const entities = [];
    fields.forEach((field) => {
      entities.push(this.fromField(field));
    });
    return entities;
  }
}
