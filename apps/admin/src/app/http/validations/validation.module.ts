import { Module } from '@nestjs/common';
import { CoreValidationModule } from 'libs/core/validations/src/core-validation.module';
import { ValidationController } from './validation.controller';

@Module({
  imports: [CoreValidationModule],
  controllers: [ValidationController],
})
export class ValidationModule {}
