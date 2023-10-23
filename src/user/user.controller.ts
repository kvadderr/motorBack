import { Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './user.entity';
import { UserResponse } from './type/userResponse';
import { Roles } from '../auth/decorator/roles.decorator';

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
    console.log(req.user)
    try {
      return req.user;
    } catch (error) {
      throw new NotFoundException(`Cannot find products`);
    }
  }

}
