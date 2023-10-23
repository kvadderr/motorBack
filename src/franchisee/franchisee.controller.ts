import { Controller, Get, Post, Req, Body, Patch, Param, Delete } from '@nestjs/common';
import { FranchiseeService } from './franchisee.service';
import { CreateFranchiseeDto } from './dto/create-franchisee.dto';
import { UpdateFranchiseeDto } from './dto/update-franchisee.dto';

@Controller('franchisee')
export class FranchiseeController {
  constructor(private readonly franchiseeService: FranchiseeService) {}

  @Post()
  create(@Body() createFranchiseeDto: CreateFranchiseeDto) {
    return this.franchiseeService.create(createFranchiseeDto);
  }

  @Get()
  findAll() {
    return this.franchiseeService.findAll();
  }

  @Get('/me')
  findOne(@Req() req) {
    return this.franchiseeService.findOne(+req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFranchiseeDto: UpdateFranchiseeDto) {
    return this.franchiseeService.update(+id, updateFranchiseeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchiseeService.remove(+id);
  }
}
