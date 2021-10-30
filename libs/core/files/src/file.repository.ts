import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from '@shared/app/schemas/files/file.schema';
import { Model } from 'mongoose';
import { FileDto } from './dtos/file.dto';

@Injectable()
export class FileRepository {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async create(roleDto: FileDto): Promise<File> {
    const newFile = new this.fileModel(roleDto);
    return await newFile.save();
  }

  async updateFileAsTemporary(url: string): Promise<File> {
    console.log(url);
    const file = await this.fileModel.findOne({ url });
    if (!file) {
      return;
    }
    console.log('updating file');
    await file.update({ isTemp: true });
  }
}
