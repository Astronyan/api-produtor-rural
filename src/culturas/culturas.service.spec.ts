import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultura } from '../database/entities/cultura.entity';
import { CulturasService } from './culturas.service';
import { mockCultura } from './culturas.mock';

describe('CulturasService', () => {
  let service: CulturasService;
  let repository: Repository<Cultura>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(cultura => Promise.resolve(mockCultura)),
    find: jest.fn().mockResolvedValue([mockCultura]),
    findOne: jest.fn().mockResolvedValue(mockCultura),
    findOneBy: jest.fn().mockResolvedValue(mockCultura),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CulturasService,
        { provide: getRepositoryToken(Cultura), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CulturasService>(CulturasService);
    repository = module.get<Repository<Cultura>>(getRepositoryToken(Cultura));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cultura', async () => {
    const result = await service.create('Soja');
    expect(result).toEqual(mockCultura);
    expect(repository.create).toHaveBeenCalledWith({ nome: 'Soja' });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should find all culturas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCultura]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find one cultura by id', async () => {
    const result = await service.findOne('uuid-cultura');
    expect(result).toEqual(mockCultura);
    expect(repository.findOneBy).toHaveBeenCalled();
  });

  it('should update a cultura', async () => {
    const result = await service.update('uuid-cultura', { nome: 'Milho' });
    expect(result).toEqual(mockCultura);
    expect(repository.findOneBy).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should remove a cultura', async () => {
    await service.remove('uuid-cultura');
    expect(repository.delete).toHaveBeenCalled();
  });
});