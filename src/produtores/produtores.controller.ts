import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProdutoresService } from './produtores.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@Controller('produtores')
export class ProdutoresController {
  constructor(private readonly produtoresService: ProdutoresService) {}

  @Post()
  create(@Body() createProdutorDto: CreateProdutorDto) {
    return this.produtoresService.create(createProdutorDto);
  }

  @Get()
  findAll() {
    return this.produtoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutorDto: Partial<CreateProdutorDto>) {
    return this.produtoresService.update(id, updateProdutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoresService.remove(id);
  }
}
