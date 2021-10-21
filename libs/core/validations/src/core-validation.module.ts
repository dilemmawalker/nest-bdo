import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Validation,
  ValidationSchema,
} from '@shared/app/schemas/validation/validation.schema';
import { ValidationRepository } from './validation.repository';
import { ValidationService } from './validation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Validation.name, schema: ValidationSchema },
    ]),
  ],
  providers: [ValidationService, ValidationRepository],
  exports: [ValidationService, ValidationRepository],
})
export class CoreValidationModule {}
