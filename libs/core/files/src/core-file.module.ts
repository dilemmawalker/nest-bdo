import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '@shared/app/schemas/files/file.schema';
import { StoreModule } from 'apps/admin/src/app/http/stores/store.module';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [
    StoreModule,
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileService, FileRepository],
  exports: [FileService, FileRepository],
})
export class CoreFileModule {}
