import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from '../database/entities/produtor.entity';
import { ProdutoresService } from './produtores.service';
import { mockCreateProdutorDto, mockProdutor } from './produtores.mock';

describe('ProdutoresService', () => {
  let service: ProdutoresService;
  let repository: Repository<Produtor>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(produtor => Promise.resolve(mockProdutor)),
    find: jest.fn().mockResolvedValue([mockProdutor]),
    findOne: jest.fn().mockResolvedValue(mockProdutor),
    findOneBy: jest.fn().mockResolvedValue(mockProdutor),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoresService,
        { provide: getRepositoryToken(Produtor), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ProdutoresService>(ProdutoresService);
    repository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a produtor', async () => {
    const result = await service.create(mockCreateProdutorDto);
    expect(result).toEqual(mockProdutor);
    expect(repository.create).toHaveBeenCalledWith(mockCreateProdutorDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should find all produtores', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockProdutor]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find one produtor by id', async () => {
    const result = await service.findOne('uuid-produtor');
    expect(result).toEqual(mockProdutor);
    expect(repository.findOneBy).toHaveBeenCalled();
  });

  it('should update a produtor', async () => {
    const result = await service.update('uuid-produtor', { nome: 'João Atualizado' });
    expect(result).toEqual(mockProdutor);
    expect(repository.findOneBy).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should remove a produtor', async () => {
    await service.remove('uuid-produtor');
    expect(repository.delete).toHaveBeenCalled();
  });
});