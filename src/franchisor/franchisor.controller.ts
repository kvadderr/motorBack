import { Controller, Get, Req, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FranchisorService } from './franchisor.service';
import { CreateFranchisorDto } from './dto/create-franchisor.dto';
import { UpdateFranchisorDto } from './dto/update-franchisor.dto';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('franchisor')
export class FranchisorController {
  constructor(private readonly franchisorService: FranchisorService) {}

  @Post()
  create(@Body() createFranchisorDto: CreateFranchisorDto) {
    return this.franchisorService.create(createFranchisorDto);
  }

  @Get()
  @Roles('admin', 'root', 'manager')
  findAll() {
    return this.franchisorService.findAll();
  }

  @Get('/me')
  findOne(@Req() req) {
    return this.franchisorService.findOne(+req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFranchisorDto: UpdateFranchisorDto) {
    return this.franchisorService.update(+id, updateFranchisorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchisorService.remove(+id);
  }
}
