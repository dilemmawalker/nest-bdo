import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseItemSchema } from '@shared/app/schemas/base/base-Item.schema';
import { Document } from 'mongoose';
import { Field } from '../fields/field.schema';
import { Workflow } from '../workflows/workflow.schema';

export type StoreDocument = Store & Document;

@Schema()
export class Store extends BaseItemSchema {
  @Prop({ required: true })
  name: string;

  @Prop()
  properties: Field[];

  @Prop()
  workflow: Workflow[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
