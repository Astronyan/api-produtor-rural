import { Test, TestingModule } from '@nestjs/testing';
import { FazendasController } from './fazendas.controller';
import { FazendasService } from './fazendas.service';
import { mockCreateFazendaDto, mockFazenda } from './fazendas.mock';

describe('FazendasController', () => {
  let controller: FazendasController;
  let service: FazendasService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockFazenda),
    findAll: jest.fn().mockResolvedValue([mockFazenda]),
    findOne: jest.fn().mockResolvedValue(mockFazenda),
    update: jest.fn().mockResolvedValue(mockFazenda),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FazendasController],
      providers: [{ provide: FazendasService, useValue: mockService }],
    }).compile();

    controller = module.get<FazendasController>(FazendasController);
    service = module.get<FazendasService>(FazendasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a fazenda', async () => {
    expect(await controller.create(mockCreateFazendaDto)).toEqual(mockFazenda);
    expect(service.create).toHaveBeenCalledWith(mockCreateFazendaDto);
  });

  it('should find all fazendas', async () => {
    expect(await controller.findAll()).toEqual([mockFazenda]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one fazenda by id', async () => {
    expect(await controller.findOne('uuid-fazenda')).toEqual(mockFazenda);
    expect(service.findOne).toHaveBeenCalledWith('uuid-fazenda');
  });

  it('should update a fazenda', async () => {
    expect(await controller.update('uuid-fazenda', { nome: 'Fazenda Atualizada' })).toEqual(mockFazenda);
    expect(service.update).toHaveBeenCalledWith('uuid-fazenda', { nome: 'Fazenda Atualizada' });
  });

  it('should remove a fazenda', async () => {
    await controller.remove('uuid-fazenda');
    expect(service.remove).toHaveBeenCalledWith('uuid-fazenda');
  });
});