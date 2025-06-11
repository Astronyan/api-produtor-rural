import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultura } from '../database/entities/cultura.entity';

@Injectable()
export class CulturasService {
  private readonly logger = new Logger(CulturasService.name);

  constructor(
    @InjectRepository(Cultura)
    private culturaRepository: Repository<Cultura>,
  ) {}

  async create(nome: string): Promise<Cultura> {
    this.logger.log(`Criando cultura: ${nome}`);
    try {
      const cultura = this.culturaRepository.create({ nome });
      const saved = await this.culturaRepository.save(cultura);
      this.logger.log(`Cultura criada com sucesso: ${saved.id}`);
      return saved;
    } catch (error) {
      this.logger.error(`Erro ao criar cultura: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Cultura[]> {
    this.logger.log(`Buscando todas as culturas`);
    return this.culturaRepository.find();
  }

  async findOne(id: string): Promise<Cultura> {
    this.logger.log(`Buscando cultura com ID: ${id}`);
    const cultura = await this.culturaRepository.findOneBy({ id });
    if (!cultura) {
      this.logger.warn(`Cultura com ID ${id} não encontrada`);
      throw new Error(`Cultura com ID ${id} não encontrada`);
    }
    return cultura;
  }

  async update(id: string, updateCulturaDto: Partial<{ nome: string }>): Promise<Cultura> {
    this.logger.log(`Atualizando cultura com ID: ${id}`);
    const cultura = await this.culturaRepository.findOneBy({ id });
    if (!cultura) {
      this.logger.warn(`Cultura com ID ${id} não encontrada`);
      throw new Error(`Cultura com ID ${id} não encontrada`);
    }
    Object.assign(cultura, updateCulturaDto);
    const saved = await this.culturaRepository.save(cultura);
    this.logger.log(`Cultura atualizada com sucesso: ${saved.id}`);
    return saved;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removendo cultura com ID: ${id}`);
    const result = await this.culturaRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Cultura com ID ${id} não encontrada`);
      throw new Error(`Cultura com ID ${id} não encontrada`);
    }
    this.logger.log(`Cultura removida com sucesso: ${id}`);
  }
}
