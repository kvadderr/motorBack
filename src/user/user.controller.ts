import { Controller, Get, NotFoundException, Req, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './user.entity';
import { UserResponse } from './type/userResponse';
import { Roles } from '../auth/decorator/roles.decorator';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import * as bcrypt from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin', 'root')
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find products`);
    }
  }

  @Get('/me')
  async getMe(@Req() req): Promise<User> {
    try {
      return req.user;
    } catch (error) {
      throw new NotFoundException(`Cannot find products`);
    }
  }

  @Post()
  async create(@Body() createSpaceworkDto: RegisterUserDto) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(createSpaceworkDto.password, saltRounds);
    return this.userService.create({...createSpaceworkDto,  password: hashedPassword});
  }

}
