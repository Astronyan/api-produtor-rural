import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateProdutorDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14) // CPF (11) / CNPJ (14)
  documento: string;

  @IsString()
  @IsNotEmpty()
  nome: string;
}
