import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpaceworkService } from './spacework.service';
import { CreateSpaceworkDto } from './dto/create-spacework.dto';
import { UpdateSpaceworkDto } from './dto/update-spacework.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('spacework')
export class SpaceworkController {
  constructor(private readonly spaceworkService: SpaceworkService) {}

  @Post()
  create(@Body() createSpaceworkDto: CreateSpaceworkDto) {
    return this.spaceworkService.create(createSpaceworkDto);
  }

  @Get()
  findAll() {
    return this.spaceworkService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'root', 'manager', 'franchisor', 'franchisee')
  findByFranchaisor(@Param('id') id: string) {
    return this.spaceworkService.findByFranchaisor(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceworkDto: UpdateSpaceworkDto) {
    return this.spaceworkService.update(+id, updateSpaceworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceworkService.remove(+id);
  }
}
