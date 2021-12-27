import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '@shared/app/schemas/files/file.schema';
import { CoreStoreModule } from 'libs/core/stores/src/core-store.module';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [
    forwardRef(() => CoreStoreModule),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileService, FileRepository],
  exports: [FileService, FileRepository],
})
export class CoreFileModule {}
