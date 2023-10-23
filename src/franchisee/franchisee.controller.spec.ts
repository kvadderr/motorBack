import { Test, TestingModule } from '@nestjs/testing';
import { FranchiseeController } from './franchisee.controller';
import { FranchiseeService } from './franchisee.service';

describe('FranchiseeController', () => {
  let controller: FranchiseeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FranchiseeController],
      providers: [FranchiseeService],
    }).compile();

    controller = module.get<FranchiseeController>(FranchiseeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
