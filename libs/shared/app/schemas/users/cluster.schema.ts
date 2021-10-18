import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Workflow } from 'apps/admin/src/app/schemas/workflows/workflow.schema';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Cluster extends BaseItemSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Workflow' })
  lead: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Workflow' })
  onboarding: mongoose.Types.ObjectId;
}

export const ClusterSchema = SchemaFactory.createForClass(Cluster);
