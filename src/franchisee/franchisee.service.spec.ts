import { Test, TestingModule } from '@nestjs/testing';
import { FranchiseeService } from './franchisee.service';

describe('FranchiseeService', () => {
  let service: FranchiseeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FranchiseeService],
    }).compile();

    service = module.get<FranchiseeService>(FranchiseeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
