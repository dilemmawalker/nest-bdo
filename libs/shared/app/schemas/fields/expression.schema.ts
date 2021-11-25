import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed } from 'mongoose';
import { Field } from './field.schema';

export type ExpressionDocument = Expression & Document;

export class ExpressionVariable {
  @ApiProperty()
  type: string; //constant  -> fieldType
  @ApiProperty()
  value: string;
}
@Schema()
export class Expression {
  @ApiProperty({ type: ExpressionVariable })
  @Prop({ required: true })
  variables: ExpressionVariable[];

  @ApiProperty()
  @Prop({ required: true })
  operator: string;
}

export const ExpressionSchema = SchemaFactory.createForClass(Expression);
