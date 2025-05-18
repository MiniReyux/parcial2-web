import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
