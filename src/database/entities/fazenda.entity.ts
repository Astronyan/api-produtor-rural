import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Produtor } from './produtor.entity';
import { CulturaPlantada } from './cultura-plantada.entity';

@Entity('fazendas')
export class Fazenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;
  
  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column('decimal', { precision: 10, scale: 2 })
  areaTotalHa: number;

  @Column('decimal', { precision: 10, scale: 2 })
  areaAgricultavelHa: number;

  @Column('decimal', { precision: 10, scale: 2 })
  areaVegetacaoHa: number;

  @ManyToOne(() => Produtor, (produtor) => produtor.fazendas)
  produtor: Produtor;

  @OneToMany(() => CulturaPlantada, (cultura) => cultura.fazenda)
  culturasPlantadas: CulturaPlantada[];
}
