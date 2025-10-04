import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MimeType } from 'aws-sdk/clients/kendra';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string = 'frisson-music-app';
  private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'eu-north-1',
      signatureVersion: 'v4',
    });

    this.bucketName = process.env.S3_BUCKET_NAME || this.bucketName;
  }

  async getPresignedUrl(key: string): Promise<string | null> {
    try {
      return await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucketName,
        Key: key,
        Expires: 3600,
      });
    } catch (error) {
      this.logger.error(
        `Failed to get presigned URL for key ${key}`,
        error.stack,
      );
      return null;
    }
  }

  async upload({
    file,
    folder,
    name,
    mimetype,
  }: {
    file: Buffer;
    folder: string;
    name: string;
    mimetype: MimeType;
  }): Promise<SendData> {
    const key = `${folder}/${name}`;
    try {
      return await this.s3
        .upload({
          Bucket: this.bucketName,
          Key: key,
          Body: file,
          ContentType: mimetype,
          ContentDisposition: 'inline',
        })
        .promise();
    } catch (e) {
      this.logger.error(`Could not upload file to s3`, e.stack);
      throw e;
    }
  }
}
