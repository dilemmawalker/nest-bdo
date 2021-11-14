import { CoreFileModule } from '@file/file/core-file.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '@shared/app/schemas/files/file.schema';
import { CoreUtilityModule } from '@utility/utilities/core-utilities.module';
import { UtilityController } from './utility.controller';

@Module({
  imports: [CoreUtilityModule],
  controllers: [UtilityController],
  providers: [],
  exports: [],
})
export class UtilityModule {}
