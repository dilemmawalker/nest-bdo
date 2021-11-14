import { Module } from '@nestjs/common';
import { CoreUtilityModule } from '@utility/utilities/core-utilities.module';
import { UtilityController } from './utility.controller';

@Module({
  imports: [CoreUtilityModule],
  controllers: [UtilityController],
  providers: [],
  exports: [],
})
export class UtilityModule {}
