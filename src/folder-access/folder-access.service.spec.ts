import { Test, TestingModule } from '@nestjs/testing';
import { FolderAccessService } from './folder-access.service';

describe('FolderAccessService', () => {
  let service: FolderAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderAccessService],
    }).compile();

    service = module.get<FolderAccessService>(FolderAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
