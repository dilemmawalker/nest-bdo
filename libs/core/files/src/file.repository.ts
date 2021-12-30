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
    const file = await this.fileModel.findOne({ url });
    if (!file) {
      return;
    }
    await file.update({ isTemp: true });
  }

  async getAllTrueStatusFiles(): Promise<any> {
    const file = await this.fileModel.find({ isTemp: true });
    return file;
  }

  async deleteAllTrueStatusFiles(filesToDelete): Promise<any> {
    await this.fileModel.findByIdAndDelete({ keyName: filesToDelete.keyName });
  }
}
