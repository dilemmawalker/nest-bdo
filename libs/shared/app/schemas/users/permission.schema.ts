import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseItemSchema } from '../base/base-Item.schema';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission extends BaseItemSchema {
  @Prop()
  permissionId: string;

  @Prop({ unique: true })
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
