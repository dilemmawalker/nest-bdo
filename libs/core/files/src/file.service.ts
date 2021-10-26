import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileService {
  public async uploadFile(imageBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    console.log(fileName);
    return await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_KEY,
        Body: imageBuffer,
        Key: 'img/' + fileName,
      })
      .promise();
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
