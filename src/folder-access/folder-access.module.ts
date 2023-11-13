import { Module } from '@nestjs/common';
import { FolderAccessService } from './folder-access.service';
import { FolderAccessController } from './folder-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderAccess } from './entities/folder-access.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FolderAccess])],
  controllers: [FolderAccessController],
  providers: [FolderAccessService],
})
export class FolderAccessModule { }
