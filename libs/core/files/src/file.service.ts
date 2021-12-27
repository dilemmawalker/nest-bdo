import { Injectable, NotFoundException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { FileDto } from './dtos/file.dto';
import { FileRepository } from './file.repository';
import { File } from '@shared/app/schemas/files/file.schema';
import { StoreService } from 'libs/core/stores/src/store.service';
import * as htmlPdf from 'html-pdf-chrome';

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
    location?: any,
  ) {
    console.log('upload file');
    const s3 = new S3();
    console.log(fileName);
    const s3Obj = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_KEY,
        Body: imageBuffer,
        Key: fileName,
      })
      .promise();
    console.log('uploaded file', s3Obj.Location);
    fileDto.url = s3Obj.Location;
    const storeObj = {};
    storeObj[fileDto.keyName] = fileDto.url;
    if (!fileDto.isMultiple) {
      await this.checkExistingFile(fileDto);
      this.storeService.updateStore(storeObj, fileDto.refId);
    }
    if (fileDto.isMultiple) {
      const store = await this.storeService.findOne(fileDto.refId);
      if (store) {
        let fileUrlArray = store.get(fileDto.keyName);
        if (typeof fileUrlArray != 'object') {
          fileUrlArray = [];
        }
        console.log(fileUrlArray);
        fileUrlArray.push(fileDto.url);
        const storeObj = {};
        storeObj[fileDto.keyName] = fileUrlArray;
        if (location != null) {
          storeObj[fileDto.keyName + '_location'] = location;
        }
        this.storeService.updateStore(storeObj, fileDto.refId);
      }
    }

    return await this.addFileEntry(fileDto);
  }

  public async deleFileObj(fileDto: FileDto) {
    const store: any = await this.storeService.findOne(fileDto.refId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    const storeObj: any = {};
    storeObj[fileDto.keyName] = '';
    await this.storeService.updateStore(storeObj, fileDto.refId);
    await this.markFileAsTemp(fileDto.url);
  }

  public async checkExistingFile(fileDto: FileDto) {
    console.log('getting file', fileDto.refId);
    const store: any = await this.storeService.findOne(fileDto.refId);
    console.log(store);
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

  public async deleFilePermanent(): Promise<any> {
    const filesToDelete = await this.fileRepository.getAllTrueStatusFiles();
    await this.fileRepository.deleteAllTrueStatusFiles(filesToDelete);
    filesToDelete.foreach(async (file) => {
      await this.deleteFile(file.keyName);
      const storeObj = {};
      storeObj[file.keyName] = '';
      await this.storeService.updateStore(storeObj, file.refId);
    });
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

  async generatePDF(html: string): Promise<Buffer> {
    const pdf = await htmlPdf.create(html);
    const buffer = pdf.toBuffer();
    return buffer;
  }
}
