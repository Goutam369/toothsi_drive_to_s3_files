import { Injectable, NotFoundException } from '@nestjs/common';
import { AutoUploadsRepository } from './dto/autoUploads.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAutoUploadsFilterDto } from './dto/get-autoUploads-filter.dto';
import { AutoUpload } from './dto/autoUpload.entity';
import { CreateAutoUploadDto } from './dto/create-autoUpload.dto';
import { UpdateAutoUploadDto } from './dto/update-autoUpload.dto';
import { Status } from './dto/status.enum';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import * as url from 'url';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config();

//Google
const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE;
const REDIRECT_URI = process.env.REDIRECT_URI_GOOGLE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GOOGLE;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

//AWS
const ID = process.env.ID_AWS;
const SECRET = process.env.SECRET_AWS;
const BUCKET_NAME = process.env.BUCKET_NAME_AWS;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

@Injectable()
export class AutoUploadsService {
  constructor(
    @InjectRepository(AutoUploadsRepository)
    private autoUploadsRepository: AutoUploadsRepository,
  ) {}

  // @Cron(CronExpression.EVERY_5_MINUTES)
  async autoUploads(limit: number): Promise<{ pending: number }> {
    let pend = 0;
    await this.autoUploadsRepository
      .getAutoUpload({ status: Status.NOT_DONE })
      .then(async (res) => {
        if (res.length > 0) {
          const restp = res.length > limit ? limit : res.length;
          for (let i = 0; i < restp; i++) {
            const reslp = new UpdateAutoUploadDto();
            reslp.destination = 'N.A.';
            reslp.status = Status.PROCESSING;
            this.updateAutoUpload(res[i].id, reslp);
            this.upload(res[i].source, res[i].id);
          }
          if (limit < res.length) {
            pend = res.length - limit;
          }
        }
      });
    return { pending: pend };
  }

  async upload(UrlDriveObject: string, id: string) {
    const tempFileId = url
      .parse(UrlDriveObject, true)
      .pathname.toString()
      .split('/')[3];
    const fileid = tempFileId;
    console.log(fileid);
    try {
      drive.files.get({ fileId: fileid }, (er, rs) => {
        if (er) {
          console.log(er);
        }

        drive.files.get(
          {
            fileId: fileid,
            alt: 'media',
          },
          {
            responseType: 'stream',
          },
          (err, reslt) => {
            if (err) {
              const reslp = new UpdateAutoUploadDto();
              reslp.destination = 'N.A.';
              reslp.status = Status.FAILD;
              this.updateAutoUpload(id, reslp);
              return;
            }
            const buff = [];
            reslt?.data.on('data', async (e) => {
              buff.push(e);
            });

            reslt?.data.on('end', async () => {
              const buffer = Buffer.concat(buff);
              const fileContent = buffer;

              const params = {
                Bucket: BUCKET_NAME,
                Key: rs.data.name,
                Body: fileContent,
              };
              const reslt = await s3.upload(params).promise();
              const reslp = new UpdateAutoUploadDto();
              reslp.destination = reslt.Location;
              reslp.status = Status.DONE;
              this.updateAutoUpload(id, reslp);
            });
          },
        );
      });
    } catch (error) {
      throw error;
    }
  }

  getAutoUploads(filterDto: GetAutoUploadsFilterDto): Promise<AutoUpload[]> {
    return this.autoUploadsRepository.getAutoUpload(filterDto);
  }

  async getAutoUploadById(id): Promise<AutoUpload> {
    const found = await this.autoUploadsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`AutoUpload with id "${id}" not found`);
    }
    return found;
  }

  createAutoUpload(
    createAutoUploadDto: CreateAutoUploadDto,
  ): Promise<AutoUpload> {
    return this.autoUploadsRepository.createAutoUpload(createAutoUploadDto);
  }

  async deleteAutoUpload(id: string): Promise<void> {
    const result = await this.autoUploadsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AutoUpload with id "${id}" not found`);
    }
  }

  async updateAutoUpload(
    id: string,
    updateAutoUploadDto: UpdateAutoUploadDto,
  ): Promise<string> {
    const autoUpload = await this.getAutoUploadById(id);
    autoUpload.destination = updateAutoUploadDto.destination;
    autoUpload.status = updateAutoUploadDto.status;

    await this.autoUploadsRepository.save(autoUpload);
    console.log('src: ' + autoUpload.source);
    console.log('dest: ' + autoUpload.destination);
    return autoUpload.destination;
  }
}
