import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScheduleModule } from '@nestjs/schedule';
import { AutoUploadsController } from './auto-uploads.controller';
import { AutoUploadsService } from './auto-uploads.service';
import { AutoUploadsRepository } from './dto/autoUploads.repository';
import { Toothsi_drive_to_s3_files } from './dto/toothsi_drive_to_s3_files.repository';
import { Toothsi_patient_oneview_drive_s3 } from './dto/toothsi_patient_oneview_drive_s3.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AutoUploadsRepository,
      Toothsi_drive_to_s3_files,
      Toothsi_patient_oneview_drive_s3,
    ]),
    // ScheduleModule.forRoot(),
  ],
  controllers: [AutoUploadsController],
  providers: [AutoUploadsService],
})
export class AutoUploadsModule {}
