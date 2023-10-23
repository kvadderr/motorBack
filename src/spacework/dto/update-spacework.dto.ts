import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceworkDto } from './create-spacework.dto';

export class UpdateSpaceworkDto extends PartialType(CreateSpaceworkDto) {}
