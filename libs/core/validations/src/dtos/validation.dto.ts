import { Prop } from '@nestjs/mongoose';

export class ValidationDto {
  @Prop({ required: true })
  name: string;
  options: any[];
  type: string;
  @Prop({ required: true })
  status: boolean;
}
