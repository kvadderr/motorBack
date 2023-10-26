import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserResponse } from './type/userResponse';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { FranchisorService } from 'src/franchisor/franchisor.service';
import { FranchiseeService } from 'src/franchisee/franchisee.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly franchisorService: FranchisorService,
    private readonly franchiseeService: FranchiseeService,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findUserWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne({
      select: [
        'id',
        'email',
        'role',
        'tokenVersion',
        'password',
      ],
      where: { email },
    });
  }

  async findOneById(id: number): Promise<UserResponse> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async create(user: RegisterUserDto): Promise<UserResponse> {
    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    const { password, createdAt, updatedAt, ...userResult } = newUser;
    if (user.franchisor) {
      const franchisor = await this.franchisorService.create({
        ...user.franchisor,
        user: userResult
      });
    }
    if (user.franchisee) {
      const franchisee = await this.franchiseeService.create({
        ...user.franchisee,
        user: userResult
      });
    }

    return userResult;
  }
}
