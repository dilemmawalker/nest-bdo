import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';

export type AgentDocument = Agent & Document;

@Schema()
export class Agent extends BaseItemSchema {
  _id: mongoose.Types.ObjectId;
  @Prop()
  agentId: string;

  @Prop({ unique: true })
  userId: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cluster' })
  cluster: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Store' })
  stores: Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Meeting' })
  meetings: Types.ObjectId[];
}

export class AgentDto {
  userId: string;
  active: boolean;
  agentId: string;
  clusterName: string;
  cluster: Types.ObjectId;
  user: Types.ObjectId;
}
export const AgentSchema = SchemaFactory.createForClass(Agent);
