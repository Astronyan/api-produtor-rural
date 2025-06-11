import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from './produtores.service';
import { mockCreateProdutorDto, mockProdutor } from './produtores.mock';

describe('ProdutoresController', () => {
  let controller: ProdutoresController;
  let service: ProdutoresService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockProdutor),
    findAll: jest.fn().mockResolvedValue([mockProdutor]),
    findOne: jest.fn().mockResolvedValue(mockProdutor),
    update: jest.fn().mockResolvedValue(mockProdutor),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoresController],
      providers: [{ provide: ProdutoresService, useValue: mockService }],
    }).compile();

    controller = module.get<ProdutoresController>(ProdutoresController);
    service = module.get<ProdutoresService>(ProdutoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a produtor', async () => {
    expect(await controller.create(mockCreateProdutorDto)).toEqual(mockProdutor);
    expect(service.create).toHaveBeenCalledWith(mockCreateProdutorDto);
  });

  it('should find all produtores', async () => {
    expect(await controller.findAll()).toEqual([mockProdutor]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one produtor by id', async () => {
    expect(await controller.findOne('uuid-produtor')).toEqual(mockProdutor);
    expect(service.findOne).toHaveBeenCalledWith('uuid-produtor');
  });

  it('should update a produtor', async () => {
    expect(await controller.update('uuid-produtor', { nome: 'João Atualizado' })).toEqual(mockProdutor);
    expect(service.update).toHaveBeenCalledWith('uuid-produtor', { nome: 'João Atualizado' });
  });

  it('should remove a produtor', async () => {
    await controller.remove('uuid-produtor');
    expect(service.remove).toHaveBeenCalledWith('uuid-produtor');
  });
});