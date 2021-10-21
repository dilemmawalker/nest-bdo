import { Module } from '@nestjs/common';
import { CoreFieldModule } from 'libs/core/fields/src/core-field.module';
import { FieldController } from './field.controller';

@Module({
  imports: [CoreFieldModule],
  controllers: [FieldController],
})
export class FieldModule {}
