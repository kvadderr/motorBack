import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto)
    return this.groupRepository.save(createGroupDto);
  }

  async findAllByFranchaisor(id: number) {
    return await this.groupRepository.find({
      where: { user_id: id }
    })
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
