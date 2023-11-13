import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderAccessDto } from './create-folder-access.dto';

export class UpdateFolderAccessDto extends PartialType(CreateFolderAccessDto) {}
