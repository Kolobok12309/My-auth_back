import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.filesService.upload(file);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filesService.remove(id);
  }
}
