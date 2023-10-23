import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSpaceworkDto } from './dto/create-spacework.dto';
import { UpdateSpaceworkDto } from './dto/update-spacework.dto';
import { Spacework } from './entities/spacework.entity';

@Injectable()
export class SpaceworkService {

  constructor(
    @InjectRepository(Spacework)
    private readonly spaceworkRepository: Repository<Spacework>,
  ) { }

  async create(createSpaceworkDto: CreateSpaceworkDto) {
    const newSpacework = await this.spaceworkRepository.create(createSpaceworkDto);
    await this.spaceworkRepository.save(newSpacework);
    const { createdAt, updatedAt, ...spaceworkResult } = newSpacework;
    return spaceworkResult;
  }

  async findAll() {
    return await this.spaceworkRepository.find();
  }

  async findByFranchaisor(id: number) {
    return await this.spaceworkRepository.find({
      where: { franchisor_id: id }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} spacework`;
  }

  update(id: number, updateSpaceworkDto: UpdateSpaceworkDto) {
    return `This action updates a #${id} spacework`;
  }

  remove(id: number) {
    return `This action removes a #${id} spacework`;
  }
}
