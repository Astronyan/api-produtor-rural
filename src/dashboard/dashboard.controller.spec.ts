import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { mockSummary, mockFazendasPorEstado, mockCulturasPlantadasPorTipo, mockUsoDeSolo } from './dashboard.mock';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  const mockService = {
    getSummary: jest.fn().mockResolvedValue(mockSummary),
    getFazendasPorEstado: jest.fn().mockResolvedValue(mockFazendasPorEstado),
    getCulturasPlantadasPorTipo: jest.fn().mockResolvedValue(mockCulturasPlantadasPorTipo),
    getUsoDeSolo: jest.fn().mockResolvedValue(mockUsoDeSolo),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [{ provide: DashboardService, useValue: mockService }],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get summary', async () => {
    expect(await controller.getSummary()).toEqual(mockSummary);
    expect(service.getSummary).toHaveBeenCalled();
  });

  it('should get fazendas por estado', async () => {
    expect(await controller.getFazendasPorEstado()).toEqual(mockFazendasPorEstado);
    expect(service.getFazendasPorEstado).toHaveBeenCalled();
  });

  it('should get culturas plantadas por tipo', async () => {
    expect(await controller.getCulturasPlantadasPorTipo()).toEqual(mockCulturasPlantadasPorTipo);
    expect(service.getCulturasPlantadasPorTipo).toHaveBeenCalled();
  });

  it('should get uso de solo', async () => {
    expect(await controller.getUsoDeSolo()).toEqual(mockUsoDeSolo);
    expect(service.getUsoDeSolo).toHaveBeenCalled();
  });
});