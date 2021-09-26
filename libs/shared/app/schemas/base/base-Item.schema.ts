import { Prop } from '@nestjs/mongoose';

export class BaseItemSchema {
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
