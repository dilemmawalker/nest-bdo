import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';

export type ClusterManagerDocument = ClusterManager & Document;

@Schema()
export class ClusterManager extends BaseItemSchema {
  @Prop()
  clusterManagerId: string;

  @Prop({ unique: true })
  userId: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Cluster' })
  clusters: Types.ObjectId[];
}

export class ClusterManagerDto {
  userId: string;
  active: boolean;
  clusterManagerId: string;
  clusters: Types.ObjectId[];
  clusterNames: string[];
}
export const ClusterManagerSchema =
  SchemaFactory.createForClass(ClusterManager);
