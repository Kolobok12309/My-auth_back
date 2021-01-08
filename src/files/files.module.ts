import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileEntity } from '@/entities';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get('STATIC_PATH', './uploads'),
          filename: (_, file, cb) =>
            cb(null, `${Date.now()}-${file.originalname}`),
        }),
        limits: {
          fileSize: configService.get<number>('MAX_FILE_SIZE', 10 * 1024 * 1024),
        },
      }),
      inject: [ConfigService],
    })
  ]
})
export class FilesModule {}
