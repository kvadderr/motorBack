import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFranchisorDto } from './dto/create-franchisor.dto';
import { UpdateFranchisorDto } from './dto/update-franchisor.dto';
import { Repository } from 'typeorm';

import { Franchisor } from './entities/franchisor.entity';

@Injectable()
export class FranchisorService {

  constructor(
    @InjectRepository(Franchisor)
    private readonly franchisorRepository: Repository<Franchisor>,
  ) { }

  async create(createFranchisorDto: CreateFranchisorDto) {
    const newFranchisor = await this.franchisorRepository.create(createFranchisorDto);
    await this.franchisorRepository.save(newFranchisor);
    const { createdAt, updatedAt, ...franchisorResult } = newFranchisor;
    return franchisorResult;
  }

  async findAll() {
    return await this.franchisorRepository.find();
  }

  async findOne(id: number) {
    return await this.franchisorRepository.findOne({
      where: {user_id: id}
    });
  }

  update(id: number, updateFranchisorDto: UpdateFranchisorDto) {
    return `This action updates a #${id} franchisor`;
  }

  remove(id: number) {
    return `This action removes a #${id} franchisor`;
  }
}
