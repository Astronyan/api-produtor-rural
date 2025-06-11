import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produtor } from '../database/entities/produtor.entity';
import { Repository } from 'typeorm';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@Injectable()
export class ProdutoresService {
  private readonly logger = new Logger(ProdutoresService.name);

  constructor(
    @InjectRepository(Produtor)
    private produtorRepository: Repository<Produtor>,
  ) {}

  async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    this.logger.log(`Criando produtor: ${createProdutorDto.nome}`);
    try {
      const produtor = this.produtorRepository.create(createProdutorDto);
      const saved = await this.produtorRepository.save(produtor);
      this.logger.log(`Produtor criado com sucesso: ${saved.id}`);
      return saved;
    } catch (error) {
      this.logger.error(`Erro ao criar produtor: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Produtor[]> {
    this.logger.log(`Buscando todos os produtores`);
    return this.produtorRepository.find();
  }

  async findOne(id: string): Promise<Produtor> {
    this.logger.log(`Buscando produtor com ID: ${id}`);
    const produtor = await this.produtorRepository.findOneBy({ id });
    if (!produtor) {
      this.logger.warn(`Produtor com ID ${id} não encontrado`);
      throw new Error(`Produtor com ID ${id} não encontrado`);
    }
    return produtor;
  }

  async update(id: string, updateProdutorDto: Partial<CreateProdutorDto>): Promise<Produtor> {
    this.logger.log(`Atualizando produtor com ID: ${id}`);
    const produtor = await this.produtorRepository.findOneBy({ id });
    if (!produtor) {
      this.logger.warn(`Produtor com ID ${id} não encontrado`);
      throw new Error(`Produtor com ID ${id} não encontrado`);
    }
    Object.assign(produtor, updateProdutorDto);
    const saved = await this.produtorRepository.save(produtor);
    this.logger.log(`Produtor atualizado com sucesso: ${saved.id}`);
    return saved;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removendo produtor com ID: ${id}`);
    const result = await this.produtorRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Produtor com ID ${id} não encontrado`);
      throw new Error(`Produtor com ID ${id} não encontrado`);
    }
    this.logger.log(`Produtor removido com sucesso: ${id}`);
  }
}