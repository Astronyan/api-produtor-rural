import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { CulturaPlantada } from '../database/entities/cultura-plantada.entity';
import { DashboardService } from './dashboard.service';
import { mockSummary, mockFazendasPorEstado, mockCulturasPlantadasPorTipo, mockUsoDeSolo } from './dashboard.mock';

describe('DashboardService', () => {
  let service: DashboardService;
  let fazendaRepository: any;
  let culturaPlantadaRepository: any;

  const mockFazendaRepository = {
    count: jest.fn().mockResolvedValue(mockSummary.totalFazendas),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockFazendasPorEstado),
      getRawOne: jest.fn().mockResolvedValue({ total: mockSummary.totalHectares }),
    })),
  };

  const mockCulturaPlantadaRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockCulturasPlantadasPorTipo),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getRepositoryToken(Fazenda), useValue: mockFazendaRepository },
        { provide: getRepositoryToken(CulturaPlantada), useValue: mockCulturaPlantadaRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    fazendaRepository = module.get(getRepositoryToken(Fazenda));
    culturaPlantadaRepository = module.get(getRepositoryToken(CulturaPlantada));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get summary', async () => {
    const result = await service.getSummary();
    expect(result).toEqual(mockSummary);
  });

  it('should get fazendas por estado', async () => {
    const result = await service.getFazendasPorEstado();
    expect(result).toEqual(mockFazendasPorEstado);
  });

  it('should get culturas plantadas por tipo', async () => {
    const result = await service.getCulturasPlantadasPorTipo();
    expect(result).toEqual(mockCulturasPlantadasPorTipo);
  });

  it('should get uso de solo', async () => {
    mockFazendaRepository.createQueryBuilder = jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockFazendasPorEstado),
      getRawOne: jest.fn().mockResolvedValue({ areaAgricultavel: 600, areaVegetacao: 400 }),
    }));
    const result = await service.getUsoDeSolo();
    expect(result).toEqual(mockUsoDeSolo);
  });
});