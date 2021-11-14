import { DataTypesModule } from '@dataTypes/data-types/data-types.module';
import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [DataTypesModule],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
})
export class CoreUtilityModule {}
