import { CoreFileModule } from '@file/file/core-file.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '@shared/app/schemas/files/file.schema';
import { FileController } from './file.controller';

@Module({
  imports: [
    CoreFileModule,
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
