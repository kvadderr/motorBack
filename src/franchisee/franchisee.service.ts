import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFranchiseeDto } from './dto/create-franchisee.dto';
import { UpdateFranchiseeDto } from './dto/update-franchisee.dto';
import { Franchisee } from './entities/franchisee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FranchiseeService {

  constructor(
    @InjectRepository(Franchisee)
    private readonly franchiseeRepository: Repository<Franchisee>,
  ) { }

  async create(createFranchiseeDto: CreateFranchiseeDto) {
    const newFranchisor = await this.franchiseeRepository.create(createFranchiseeDto);
    await this.franchiseeRepository.save(newFranchisor);
    const { createdAt, updatedAt, ...franchisorResult } = newFranchisor;
    return franchisorResult;
  }

  async findAll() {
    return await this.franchiseeRepository.find();
  }

  async findOne(id: number) {
    return await this.franchiseeRepository.findOne({
      where: {user_id: id}
    });
  }

  update(id: number, updateFranchiseeDto: UpdateFranchiseeDto) {
    return `This action updates a #${id} franchisee`;
  }

  remove(id: number) {
    return `This action removes a #${id} franchisee`;
  }
}
