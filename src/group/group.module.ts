import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { GroupEntity } from '@/entities';

import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([GroupEntity]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
