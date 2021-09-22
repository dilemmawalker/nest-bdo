import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'apps/api/src/constant/roles.constant';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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

  @Prop({ required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
