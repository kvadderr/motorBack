import { Test, TestingModule } from '@nestjs/testing';
import { FranchisorService } from './franchisor.service';

describe('FranchisorService', () => {
  let service: FranchisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FranchisorService],
    }).compile();

    service = module.get<FranchisorService>(FranchisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
