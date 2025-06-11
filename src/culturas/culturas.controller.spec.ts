import { Test, TestingModule } from '@nestjs/testing';
import { CulturasController } from './culturas.controller';
import { CulturasService } from './culturas.service';
import { mockCultura } from './culturas.mock';

describe('CulturasController', () => {
  let controller: CulturasController;
  let service: CulturasService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockCultura),
    findAll: jest.fn().mockResolvedValue([mockCultura]),
    findOne: jest.fn().mockResolvedValue(mockCultura),
    update: jest.fn().mockResolvedValue(mockCultura),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturasController],
      providers: [{ provide: CulturasService, useValue: mockService }],
    }).compile();

    controller = module.get<CulturasController>(CulturasController);
    service = module.get<CulturasService>(CulturasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cultura', async () => {
    expect(await controller.create('Soja')).toEqual(mockCultura);
    expect(service.create).toHaveBeenCalledWith('Soja');
  });

  it('should find all culturas', async () => {
    expect(await controller.findAll()).toEqual([mockCultura]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one cultura by id', async () => {
    expect(await controller.findOne('uuid-cultura')).toEqual(mockCultura);
    expect(service.findOne).toHaveBeenCalledWith('uuid-cultura');
  });

  it('should update a cultura', async () => {
    expect(await controller.update('uuid-cultura', { nome: 'Milho' })).toEqual(mockCultura);
    expect(service.update).toHaveBeenCalledWith('uuid-cultura', { nome: 'Milho' });
  });

  it('should remove a cultura', async () => {
    await controller.remove('uuid-cultura');
    expect(service.remove).toHaveBeenCalledWith('uuid-cultura');
  });
});