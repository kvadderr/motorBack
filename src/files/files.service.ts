import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { GoogleService } from 'src/google/google.service';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly googleService: GoogleService,
  ) { }

  async create(createFileDto: CreateFileDto) {
    const authGoogle = await this.googleService.authorize();
    const googleDoc = await this.googleService.createNewGoogleDoc(authGoogle, createFileDto.type);
    createFileDto.document_id = googleDoc;
    return this.fileRepository.save(createFileDto);
  }

  findAll() {
    return `This action returns all files`;
  }

  async findAllBySpaceWork(id: number) {
    return await this.fileRepository.find({
      where: { spacework_id: id }
    })
  }


  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
