import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { Produtor } from '../database/entities/produtor.entity';
import { Cultura } from '../database/entities/cultura.entity';
import { CulturaPlantada } from '../database/entities/cultura-plantada.entity';
import { FazendasService } from './fazendas.service';
import { FazendasController } from './fazendas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda, Produtor, Cultura, CulturaPlantada])],
  controllers: [FazendasController],
  providers: [FazendasService],
})
export class FazendasModule { }