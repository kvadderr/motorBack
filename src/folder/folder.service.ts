import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {

  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) { }

  async create(createFolderDto: CreateFolderDto) {
    const newFolder = await this.folderRepository.create(createFolderDto);
    await this.folderRepository.save(newFolder);
    const { createdAt, updatedAt, ...folderResult } = newFolder;
    return folderResult;
  }

  findAll() {
    return `This action returns all folder`;
  }

  async findAllBySpaceWork(id: number) {
    return await this.folderRepository.find({
      where: { spacework_id: id }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
