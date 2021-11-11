import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  // @ApiProperty()
  // refId: string;

  @ApiProperty()
  @Prop({ required: true })
  log_name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  subject_type: string;

  @ApiProperty()
  @Prop()
  subject_id: string;

  @ApiProperty()
  @Prop()
  causer_type: string;

  @ApiProperty()
  @Prop()
  causer_id: string;

  @ApiProperty()
  @Prop()
  properties: string;

  @ApiProperty()
  @Prop()
  created_at: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
