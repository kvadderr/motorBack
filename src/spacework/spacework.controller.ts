import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpaceworkService } from './spacework.service';
import { CreateSpaceworkDto } from './dto/create-spacework.dto';
import { UpdateSpaceworkDto } from './dto/update-spacework.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('spacework')
export class SpaceworkController {
  constructor(private readonly spaceworkService: SpaceworkService) {}

  @Post()
  create(@Body() createGroupDto: CreateSpaceworkDto) {
    return this.spaceworkService.create(createGroupDto);
  }

  @Get(':id')
  @Roles('admin', 'root', 'manager', 'franchisor', 'franchisee')
  findByFranchaisor(@Param('id') id: string) {
    return this.spaceworkService.findAllByFranchaisor(+id);
  }
}
