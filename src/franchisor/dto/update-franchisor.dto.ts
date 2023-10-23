import { PartialType } from '@nestjs/mapped-types';
import { CreateFranchisorDto } from './create-franchisor.dto';

export class UpdateFranchisorDto extends PartialType(CreateFranchisorDto) {}
