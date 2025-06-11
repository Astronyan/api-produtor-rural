import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { CulturaPlantada } from '../database/entities/cultura-plantada.entity';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectRepository(Fazenda)
    private fazendaRepository: Repository<Fazenda>,
    @InjectRepository(CulturaPlantada)
    private culturaPlantadaRepository: Repository<CulturaPlantada>,
  ) {}

  async getSummary() {
    this.logger.log(`Obtendo resumo do dashboard`);
    try {
      const totalFazendas = await this.fazendaRepository.count();
      const totalHectares = (await this.fazendaRepository
        .createQueryBuilder('fazenda')
        .select('SUM(fazenda.areaTotalHa)', 'total')
        .getRawOne()).total;
      this.logger.log(`Resumo obtido: ${totalFazendas} fazendas, ${totalHectares} hectares`);
      return {
        totalFazendas,
        totalHectares: parseFloat(totalHectares) || 0,
      };
    } catch (error) {
      this.logger.error(`Erro ao obter resumo: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getFazendasPorEstado() {
    this.logger.log(`Obtendo fazendas por estado`);
    try {
      const result = await this.fazendaRepository
        .createQueryBuilder('fazenda')
        .select('fazenda.estado', 'estado')
        .addSelect('COUNT(*)', 'count')
        .groupBy('fazenda.estado')
        .getRawMany();
      this.logger.log(`Fazendas por estado obtidas: ${result.length} estados`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao obter fazendas por estado: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getCulturasPlantadasPorTipo() {
    this.logger.log(`Obtendo culturas plantadas por tipo`);
    try {
      const result = await this.culturaPlantadaRepository
        .createQueryBuilder('cp')
        .select('c.nome', 'cultura')
        .addSelect('COUNT(*)', 'count')
        .leftJoin('cp.cultura', 'c')
        .groupBy('c.nome')
        .getRawMany();
      this.logger.log(`Culturas plantadas por tipo obtidas: ${result.length} tipos`);
      return result;
    } catch (error) {
      this.logger.error(`Erro ao obter culturas plantadas por tipo: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUsoDeSolo() {
    this.logger.log(`Obtendo uso do solo`);
    try {
      const { areaAgricultavel } = await this.fazendaRepository
        .createQueryBuilder('fazenda')
        .select('SUM(fazenda.areaAgricultavelHa)', 'areaAgricultavel')
        .getRawOne();
      const { areaVegetacao } = await this.fazendaRepository
        .createQueryBuilder('fazenda')
        .select('SUM(fazenda.areaVegetacaoHa)', 'areaVegetacao')
        .getRawOne();
      this.logger.log(`Uso do solo obtido: agricultável ${areaAgricultavel}, vegetação ${areaVegetacao}`);
      return {
        totalAreaAgricultavel: parseFloat(areaAgricultavel) || 0,
        totalAreaVegetacao: parseFloat(areaVegetacao) || 0,
      };
    } catch (error) {
      this.logger.error(`Erro ao obter uso do solo: ${error.message}`, error.stack);
      throw error;
    }
  }
}