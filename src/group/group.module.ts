import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupEntity } from '@/entities';

import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
