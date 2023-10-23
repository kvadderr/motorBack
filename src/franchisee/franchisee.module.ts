import { Module } from '@nestjs/common';
import { FranchiseeService } from './franchisee.service';
import { FranchiseeController } from './franchisee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchisee } from './entities/franchisee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Franchisee])
  ],
  controllers: [FranchiseeController],
  providers: [FranchiseeService],
  exports: [FranchiseeService]
})
export class FranchiseeModule {}
