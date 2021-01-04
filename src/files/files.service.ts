import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { FileEntity } from '@/entities';
import { FileDto } from '@/files/dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly configService: ConfigService,
  ) {}

  getAll(page: number = 1, perPage: number = 20): Promise<[FileDto[], number]> {
    return this.fileRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  upload(file: File) {
    console.log(file);
    return 'This action adds a new file';
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
