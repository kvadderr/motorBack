import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { GoogleService } from 'src/google/google.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([File])
  ],
  controllers: [FilesController],
  providers: [FilesService, GoogleService],
})
export class FilesModule {}
