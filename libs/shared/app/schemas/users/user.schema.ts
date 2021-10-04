import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'apps/admin/src/constant/auth/roles.constant';
import { Document, SchemaTypes, Types } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import { Permission } from './permission.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseItemSchema {
  @Prop()
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: 'number', min: 15, max: 60 })
  age: number;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;

  @Prop({ maxlength: 8 })
  otp: string;

  @Prop({ required: true })
  roles: Role[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }])
  permission: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
