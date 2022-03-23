import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AutoUploadsService } from './auto-uploads.service';
import { AutoUpload } from './dto/autoUpload.entity';
import { CreateAutoUploadDto } from './dto/create-autoUpload.dto';
import { GetAutoUploadsFilterDto } from './dto/get-autoUploads-filter.dto';
import { UpdateAutoUploadDto } from './dto/update-autoUpload.dto';

@Controller('auto-uploads')
export class AutoUploadsController {
  constructor(private autoUploadsService: AutoUploadsService) {}

  // @Get()
  // getAutoUploads(
  //   @Query() filterDto: GetAutoUploadsFilterDto,
  // ): Promise<AutoUpload[]> {
  //   return this.autoUploadsService.getAutoUploads(filterDto);
  // }

  @Get()
  async getAutoUploads(
    @Query('limit') limit: number,
  ): Promise<{ pending: number }> {
    return this.autoUploadsService.autoUploads(limit);
  }

  // @Get('/:id')
  // getAutoUploadById(
  //   @Body() createAutoUploadDto: CreateAutoUploadDto,
  // ): Promise<AutoUpload> {
  //   return this.autoUploadsService.createAutoUpload(createAutoUploadDto);
  // }

  @Post()
  createAutoUpload(
    @Body() createAutoUploadDto: CreateAutoUploadDto,
  ): Promise<AutoUpload> {
    return this.autoUploadsService.createAutoUpload(createAutoUploadDto);
  }

  // @Delete('/:id')
  // deleteAutoUpload(@Param('id') id: string): Promise<void> {
  //   return this.autoUploadsService.deleteAutoUpload(id);
  // }

  // @Patch('/:id')
  // updateAutoUpload(
  //   @Param('id') id: string,
  //   @Body() updateAutoUploadDto: UpdateAutoUploadDto,
  // ): Promise<AutoUpload> {
  //   return this.autoUploadsService.updateAutoUpload(id, updateAutoUploadDto);
  // }
}
