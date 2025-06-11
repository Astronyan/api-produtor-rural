import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fazenda } from '../database/entities/fazenda.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CulturaPlantada } from 'src/database/entities/cultura-plantada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fazenda, CulturaPlantada])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
