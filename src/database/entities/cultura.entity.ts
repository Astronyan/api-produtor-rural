import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CulturaPlantada } from './cultura-plantada.entity';

@Entity('culturas')
export class Cultura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nome: string; // Soja, Milho, Café

  @OneToMany(() => CulturaPlantada, (plantada) => plantada.cultura)
  fazendasComCultura: CulturaPlantada[];
}
