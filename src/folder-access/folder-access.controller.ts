import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FolderAccessService } from './folder-access.service';
import { CreateFolderAccessDto } from './dto/create-folder-access.dto';
import { UpdateFolderAccessDto } from './dto/update-folder-access.dto';

@Controller('folder-access')
export class FolderAccessController {
  constructor(private readonly folderAccessService: FolderAccessService) {}

  @Post()
  create(@Body() createFolderAccessDto: CreateFolderAccessDto) {
    return this.folderAccessService.create(createFolderAccessDto);
  }

  @Get()
  findAll() {
    return this.folderAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderAccessDto: UpdateFolderAccessDto) {
    return this.folderAccessService.update(+id, updateFolderAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderAccessService.remove(+id);
  }
}
