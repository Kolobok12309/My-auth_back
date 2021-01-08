import { promisify } from 'util';

import { unlink } from 'fs';

import { resolve } from 'path';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { FileEntity } from '@/entities';
import { FileDto } from '@/files/dto';
import { IFileMulter } from '@/files/interfaces';

const asyncUnlink = promisify(unlink);

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  getAll(page: number = 1, perPage: number = 20): Promise<[FileDto[], number]> {
    return this.fileRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  async upload(files: IFileMulter[], userId: number): Promise<FileDto[]> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await Promise.all(files.map(async ({ filename }) => {
        const rawFile = this.fileRepo.create({
          userId,
          name: filename,
        });

        return queryRunner.manager.save(rawFile);
      }));

      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  get(id: number) {
    return this.fileRepo.findOne(id);
  }

  async remove(id: number, name: string) {
    const filePath = resolve(
      this.configService.get('STATIC_PATH', './uploads'),
      name,
    );

    const [{ affected }] = await Promise.all([
      this.fileRepo.delete(id),
      asyncUnlink(filePath),
    ]);

    if (!affected) throw new NotFoundException('File not found');

    return true;
  }
}
