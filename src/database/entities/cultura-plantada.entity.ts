import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Fazenda } from './fazenda.entity';
import { Cultura } from './cultura.entity';

@Entity('culturas_plantadas')
export class CulturaPlantada {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  safra: string; // "Safra 2023"

  @ManyToOne(() => Fazenda, (fazenda) => fazenda.culturasPlantadas)
  fazenda: Fazenda;

  @ManyToOne(() => Cultura, (cultura) => cultura.fazendasComCultura)
  cultura: Cultura;
}
