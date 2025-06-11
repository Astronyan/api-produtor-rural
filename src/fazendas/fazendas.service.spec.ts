import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { Produtor } from '../database/entities/produtor.entity';
import { CulturaPlantada } from '../database/entities/cultura-plantada.entity';
import { Cultura } from '../database/entities/cultura.entity';
import { FazendasService } from './fazendas.service';
import { mockCreateFazendaDto, mockFazenda } from './fazendas.mock';
import { Repository } from 'typeorm';

describe('FazendasService', () => {
  let service: FazendasService;
  let fazendaRepository: Repository<Fazenda>;
  let produtorRepository: Repository<Produtor>;

  const mockFazendaRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(fazenda => Promise.resolve(mockFazenda)),
    find: jest.fn().mockResolvedValue([mockFazenda]),
    findOne: jest.fn().mockResolvedValue(mockFazenda),
    findOneBy: jest.fn().mockResolvedValue(mockFazenda),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockProdutorRepository = {
    findOneBy: jest.fn().mockResolvedValue({ id: 'uuid-produtor', nome: 'João da Silva', documento: '12345678901' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FazendasService,
        { provide: getRepositoryToken(Fazenda), useValue: mockFazendaRepository },
        { provide: getRepositoryToken(Produtor), useValue: mockProdutorRepository },
        { provide: getRepositoryToken(Cultura), useValue: {} },
        { provide: getRepositoryToken(CulturaPlantada), useValue: {} },
      ],
    }).compile();

    service = module.get<FazendasService>(FazendasService);
    fazendaRepository = module.get<Repository<Fazenda>>(getRepositoryToken(Fazenda));
    produtorRepository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a fazenda', async () => {
    const result = await service.create(mockCreateFazendaDto);
    expect(result).toEqual(mockFazenda);
    expect(fazendaRepository.create).toHaveBeenCalled();
    expect(fazendaRepository.save).toHaveBeenCalled();
  });

  it('should find all fazendas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockFazenda]);
    expect(fazendaRepository.find).toHaveBeenCalled();
  });

  it('should find one fazenda by id', async () => {
    const result = await service.findOne('uuid-fazenda');
    expect(result).toEqual(mockFazenda);
    expect(fazendaRepository.findOne).toHaveBeenCalled();
  });

  it('should update a fazenda', async () => {
    const result = await service.update('uuid-fazenda', { nome: 'Fazenda Atualizada' });
    expect(result).toEqual(mockFazenda);
    expect(fazendaRepository.findOne).toHaveBeenCalled();
    expect(fazendaRepository.save).toHaveBeenCalled();
  });

  it('should remove a fazenda', async () => {
    await service.remove('uuid-fazenda');
    expect(fazendaRepository.delete).toHaveBeenCalled();
  });
});