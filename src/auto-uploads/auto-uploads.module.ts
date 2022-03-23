import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScheduleModule } from '@nestjs/schedule';
import { AutoUploadsController } from './auto-uploads.controller';
import { AutoUploadsService } from './auto-uploads.service';
import { AutoUploadsRepository } from './dto/autoUploads.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AutoUploadsRepository]),
    // ScheduleModule.forRoot(),
  ],
  controllers: [AutoUploadsController],
  providers: [AutoUploadsService],
})
export class AutoUploadsModule {}
