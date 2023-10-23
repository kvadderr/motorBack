import { Test, TestingModule } from '@nestjs/testing';
import { FranchisorController } from './franchisor.controller';
import { FranchisorService } from './franchisor.service';

describe('FranchisorController', () => {
  let controller: FranchisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FranchisorController],
      providers: [FranchisorService],
    }).compile();

    controller = module.get<FranchisorController>(FranchisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
