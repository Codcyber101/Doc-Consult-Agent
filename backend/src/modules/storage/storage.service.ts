import { Injectable, Logger } from "@nestjs/common";
import * as Minio from "minio";

@Injectable()
export class StorageService {
  private readonly minioClient: Minio.Client;
  private readonly logger = new Logger(StorageService.name);
  private readonly bucketName = "govassist-docs";

  constructor() {
    if (
      process.env.NODE_ENV === "production" &&
      (process.env.MINIO_ACCESS_KEY === "minioadmin" ||
        process.env.MINIO_SECRET_KEY === "minioadmin")
    ) {
      throw new Error(
        "MinIO credentials must not use default values in production.",
      );
    }

    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || "localhost",
      port: parseInt(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    });
    this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName);
        this.logger.log(`Created bucket: ${this.bucketName}`);
      }
    } catch (err) {
      this.logger.error(`Error checking/creating bucket: ${err.message}`);
    }
  }

  async uploadFile(
    fileName: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    const objectName = `${Date.now()}-${fileName}`;
    await this.minioClient.putObject(
      this.bucketName,
      objectName,
      buffer,
      buffer.length,
      {
        "Content-Type": mimeType,
      },
    );
    return `${this.bucketName}/${objectName}`;
  }
}
