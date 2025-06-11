import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class CpfCnpjPipe implements PipeTransform {
  transform(value: any) {
    if (!cpf.isValid(value) && !cnpj.isValid(value)) {
      throw new BadRequestException('Documento inválido. Informe um CPF ou CNPJ válido.');
    }
    return value;
  }
}
