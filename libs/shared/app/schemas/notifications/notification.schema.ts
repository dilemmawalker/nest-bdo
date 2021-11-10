import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @ApiProperty()
  refId: string;

  @ApiProperty()
  @Prop({ required: true })
  type: string;

  @ApiProperty()
  @Prop()
  data: string;

  @ApiProperty()
  @Prop()
  lastUpdated: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
