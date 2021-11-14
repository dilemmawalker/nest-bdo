import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FileDto } from './dtos/file.dto';
import { FileRepository } from './file.repository';
import { File } from '@shared/app/schemas/files/file.schema';
import { StoreService } from 'apps/admin/src/app/http/stores/store.service';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly storeService: StoreService,
  ) {}
  public async uploadFile(
    imageBuffer: Buffer,
    fileName: string,
    fileDto: FileDto,
  ) {
    const s3 = new S3();
    const s3Obj = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_KEY,
        Body: imageBuffer,
        Key: fileName,
      })
      .promise();
    fileDto.url = s3Obj.Location;
    const storeObj = {};
    storeObj[fileDto.keyName] = fileDto.url;
    await this.checkExistingFile(fileDto);
    this.storeService.updateStore(storeObj, fileDto.refId);
    return await this.addFileEntry(fileDto);
  }

  public async checkExistingFile(fileDto: FileDto) {
    const store: any = await this.storeService.findOne(fileDto.refId);
    const hasStore = Boolean(store);
    const prevUrl = store.get(fileDto.keyName);
    console.log(prevUrl);
    if (hasStore && prevUrl) {
      await this.markFileAsTemp(prevUrl);
    }
  }

  public async addFileEntry(fileDto: FileDto): Promise<File> {
    return await this.fileRepository.create(fileDto);
  }

  public async markFileAsTemp(url: string): Promise<void> {
    const file = await this.fileRepository.updateFileAsTemporary(url);
    console.log(file);
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
