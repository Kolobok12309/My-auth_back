import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Param, Delete, UploadedFiles, UseInterceptors, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { Auth, User } from '@/auth/decorators';
import { ITokenUser } from '@/auth/interfaces';
import { Roles } from '@/user/interfaces';
import { IFileMulter } from '@/files/interfaces';
import { FileDto, FileUploadDto } from '@/files/dto';

import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of files',
    type: FileUploadDto,
  })
  @ApiCreatedResponse({ description: 'Return uploaded files', type: [FileDto] })
  @UseInterceptors(FilesInterceptor('file'))
  uploadFiles(
  // eslint-disable-next-line @typescript-eslint/indent
    @UploadedFiles() files: IFileMulter[],
    @User() { id }: ITokenUser,
  ) {
    return this.filesService.upload(files, id);
  }

  @Delete(':id')
  @Auth([Roles.User, Roles.Admin, Roles.Director])
  @ApiParam({ name: 'id', type: Number, description: 'Id of file' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'File not found' })
  async remove(
  // eslint-disable-next-line @typescript-eslint/indent
    @Param('id') id: number,
    @User() { id: userId, role }: ITokenUser,
  ) {
    const isAdmin = role === Roles.Admin;
    const file = await this.filesService.get(id);

    if (!file) throw new NotFoundException('File not found');

    const isSelfFile = file.userId === userId;

    if (!isAdmin || !isSelfFile) throw new ForbiddenException();

    return this.filesService.remove(id, file.name);
  }
}
