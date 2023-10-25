import { UserRole } from '../../user/user.entity';

import { CreateFranchisorDto } from 'src/franchisor/dto/create-franchisor.dto';
import { CreateFranchiseeDto } from 'src/franchisee/dto/create-franchisee.dto';
export class RegisterUserDto {
  id?: number;
  email: string;
  password?: string;
  role: UserRole;
  franchisor?: CreateFranchisorDto;
  franchisee?: CreateFranchiseeDto;
}