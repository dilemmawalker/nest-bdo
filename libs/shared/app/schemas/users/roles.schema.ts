import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export type RoleDocument = Role & Document;


@Schema()
export class Role extends BaseItemSchema {
  _id: mongoose.Types.ObjectId;
  @Prop()
  roleId: string;

  @Prop({ unique: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }])
  permissions: mongoose.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
