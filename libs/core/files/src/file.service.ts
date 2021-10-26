import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FileDto } from './dtos/file.dto';
import { FileRepository } from './file.repository';
import { File } from '@shared/app/schemas/files/file.schema';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}
  public async uploadFile(
    imageBuffer: Buffer,
    fileName: string,
    fileDto: FileDto,
  ) {
    const s3 = new S3();
    console.log(fileName);
    const s3Obj = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_KEY,
        Body: imageBuffer,
        Key: 'img/' + fileName,
      })
      .promise();
    fileDto.url = s3Obj.Location;
    return await this.addFileEntry(fileDto);
  }

  public async addFileEntry(fileDto: FileDto): Promise<File> {
    return await this.fileRepository.create(fileDto);
  }

  public async deleteFile(key: string) {
    const s3 = new S3();
    return await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_KEY,
        Key: key,
      })
      .promise();
  }
}
