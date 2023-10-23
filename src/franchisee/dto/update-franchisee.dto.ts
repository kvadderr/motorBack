import { PartialType } from '@nestjs/mapped-types';
import { CreateFranchiseeDto } from './create-franchisee.dto';

export class UpdateFranchiseeDto extends PartialType(CreateFranchiseeDto) {}
