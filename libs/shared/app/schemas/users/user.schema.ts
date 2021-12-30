import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './roles.schema';
import { Document } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseItemSchema {
  _id: mongoose.Types.ObjectId;
  @Prop()
  userId: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: 'number', min: 15, max: 60 })
  age: number;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1000000000, max: 9999999999 })
  mobile: number;

  @Prop({ maxlength: 8 })
  otp: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }])
  roles: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
