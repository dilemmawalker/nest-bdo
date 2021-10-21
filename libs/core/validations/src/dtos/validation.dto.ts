import { Prop } from '@nestjs/mongoose';

export class ValidationDto {
  @Prop({ required: true })
  name: string;
  options: any[];
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  status: boolean;
}
