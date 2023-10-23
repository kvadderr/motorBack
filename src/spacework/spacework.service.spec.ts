import { Test, TestingModule } from '@nestjs/testing';
import { SpaceworkService } from './spacework.service';

describe('SpaceworkService', () => {
  let service: SpaceworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceworkService],
    }).compile();

    service = module.get<SpaceworkService>(SpaceworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
