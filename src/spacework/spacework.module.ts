import { Module } from '@nestjs/common';
import { SpaceworkService } from './spacework.service';
import { SpaceworkController } from './spacework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spacework } from './entities/spacework.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Spacework])
  ],
  controllers: [SpaceworkController],
  providers: [SpaceworkService],
  exports: [SpaceworkService]
})
export class SpaceworkModule {}
