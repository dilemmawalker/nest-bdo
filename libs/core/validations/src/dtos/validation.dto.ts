import { Prop } from '@nestjs/mongoose';

export class ValidationDto {
  _id: string;
  @Prop({ required: true })
  name: string;
  options: any[];
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  status: boolean;
}
