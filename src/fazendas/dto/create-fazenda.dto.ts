import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFazendaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsNumber()
  @Min(0)
  areaTotalHa: number;

  @IsNumber()
  @Min(0)
  areaAgricultavelHa: number;

  @IsNumber()
  @Min(0)
  areaVegetacaoHa: number;

  @IsString()
  @IsNotEmpty()
  produtorId: string;
}
