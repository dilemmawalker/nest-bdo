import { CoreFileModule } from '@file/file/core-file.module';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';

@Module({
  imports: [
    CoreFileModule,
    // MulterModule.register({
    //   dest: './files',
    // }),
  ],
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
