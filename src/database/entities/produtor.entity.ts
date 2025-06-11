import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fazenda } from './fazenda.entity';

@Entity('produtores')
export class Produtor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 14, unique: true })
  documento: string; // CPF/CNPJ

  @Column()
  nome: string;

  @OneToMany(() => Fazenda, (fazenda) => fazenda.produtor)
  fazendas: Fazenda[];
}