import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { Produtor } from '../database/entities/produtor.entity';
import { Cultura } from '../database/entities/cultura.entity';
import { CulturaPlantada } from '../database/entities/cultura-plantada.entity';
import { CreateFazendaDto } from './dto/create-fazenda.dto';

@Injectable()
export class FazendasService {
  private readonly logger = new Logger(FazendasService.name);

  constructor(
    @InjectRepository(Fazenda)
    private fazendaRepository: Repository<Fazenda>,
    @InjectRepository(Produtor)
    private produtorRepository: Repository<Produtor>,
    @InjectRepository(Cultura)
    private culturaRepository: Repository<Cultura>,
    @InjectRepository(CulturaPlantada)
    private culturaPlantadaRepository: Repository<CulturaPlantada>,
  ) {}

  async create(createFazendaDto: CreateFazendaDto): Promise<Fazenda> {
    this.logger.log(`Criando fazenda: ${createFazendaDto.nome}`);
    try {
      if (createFazendaDto.areaAgricultavelHa + createFazendaDto.areaVegetacaoHa > createFazendaDto.areaTotalHa) {
        this.logger.error('Soma das áreas agricultável e de vegetação maior que área total');
        throw new Error('A soma das áreas agricultável e de vegetação não pode ser maior que a área total da fazenda.');
      }
      const produtor = await this.produtorRepository.findOneBy({ id: createFazendaDto.produtorId });
      if (!produtor) {
        this.logger.warn(`Produtor com ID ${createFazendaDto.produtorId} não encontrado`);
        throw new Error('Produtor não encontrado');
      }
      const fazenda = this.fazendaRepository.create({
        ...createFazendaDto,
        produtor,
      });
      const saved = await this.fazendaRepository.save(fazenda);
      this.logger.log(`Fazenda criada com sucesso: ${saved.id}`);
      return saved;
    } catch (error) {
      this.logger.error(`Erro ao criar fazenda: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Fazenda[]> {
    this.logger.log(`Buscando todas as fazendas`);
    return this.fazendaRepository.find({ relations: ['produtor'] });
  }

  async findOne(id: string): Promise<Fazenda> {
    this.logger.log(`Buscando fazenda com ID: ${id}`);
    const fazenda = await this.fazendaRepository.findOne({ where: { id }, relations: ['produtor'] });
    if (!fazenda) {
      this.logger.warn(`Fazenda com ID ${id} não encontrada`);
      throw new Error('Fazenda não encontrada');
    }
    return fazenda;
  }

  async update(id: string, updateFazendaDto: Partial<CreateFazendaDto>): Promise<Fazenda> {
    this.logger.log(`Atualizando fazenda com ID: ${id}`);
    const fazenda = await this.fazendaRepository.findOneBy({ id });
    if (!fazenda) {
      this.logger.warn(`Fazenda com ID ${id} não encontrada`);
      throw new Error('Fazenda não encontrada');
    }
    if (updateFazendaDto.areaAgricultavelHa && updateFazendaDto.areaVegetacaoHa && updateFazendaDto.areaTotalHa) {
      if (updateFazendaDto.areaAgricultavelHa + updateFazendaDto.areaVegetacaoHa > updateFazendaDto.areaTotalHa) {
        this.logger.error('Soma das áreas agricultável e de vegetação maior que área total');
        throw new Error('A soma das áreas agricultável e de vegetação não pode ser maior que a área total da fazenda.');
      }
    }
    Object.assign(fazenda, updateFazendaDto);
    const saved = await this.fazendaRepository.save(fazenda);
    this.logger.log(`Fazenda atualizada com sucesso: ${saved.id}`);
    return saved;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removendo fazenda com ID: ${id}`);
    const result = await this.fazendaRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Fazenda com ID ${id} não encontrada`);
      throw new Error('Fazenda não encontrada');
    }
    this.logger.log(`Fazenda removida com sucesso: ${id}`);
  }

  async addCulturaPlantada(fazendaId: string, culturaId: string, safra: string): Promise<CulturaPlantada> {
    this.logger.log(`Adicionando cultura plantada à fazenda ${fazendaId}`);
    try {
      const fazenda = await this.fazendaRepository.findOneBy({ id: fazendaId });
      if (!fazenda) {
        this.logger.warn(`Fazenda com ID ${fazendaId} não encontrada`);
        throw new Error('Fazenda não encontrada');
      }
      const cultura = await this.culturaRepository.findOneBy({ id: culturaId });
      if (!cultura) {
        this.logger.warn(`Cultura com ID ${culturaId} não encontrada`);
        throw new Error('Cultura não encontrada');
      }
      const culturaPlantada = this.culturaPlantadaRepository.create({
        fazenda,
        cultura,
        safra,
      });
      const saved = await this.culturaPlantadaRepository.save(culturaPlantada);
      this.logger.log(`Cultura plantada adicionada com sucesso: ${saved.id}`);
      return saved;
    } catch (error) {
      this.logger.error(`Erro ao adicionar cultura plantada: ${error.message}`, error.stack);
      throw error;
    }
  }
}