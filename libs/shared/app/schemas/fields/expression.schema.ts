import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed } from 'mongoose';
import { Field } from './field.schema';

export type ExpressionDocument = Expression & Document;

@Schema()
export class Expression {
  @ApiProperty()
  @Prop({ required: true })
  variables: ExpressionVariable[];

  @ApiProperty()
  @Prop({ required: true })
  operator: string;
}

export class ExpressionVariable {
  type: string; //constant  -> fieldType
  value: string | Expression | Field;
}

export const ExpressionSchema = SchemaFactory.createForClass(Expression);
