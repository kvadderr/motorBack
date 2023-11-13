import { Injectable } from '@nestjs/common';
import { CreateFolderAccessDto } from './dto/create-folder-access.dto';
import { UpdateFolderAccessDto } from './dto/update-folder-access.dto';

@Injectable()
export class FolderAccessService {
  create(createFolderAccessDto: CreateFolderAccessDto) {
    return 'This action adds a new folderAccess';
  }

  findAll() {
    return `This action returns all folderAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folderAccess`;
  }

  update(id: number, updateFolderAccessDto: UpdateFolderAccessDto) {
    return `This action updates a #${id} folderAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} folderAccess`;
  }
}
