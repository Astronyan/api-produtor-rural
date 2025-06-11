import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CulturasService } from './culturas.service';

@Controller('culturas')
export class CulturasController {
  constructor(private readonly culturasService: CulturasService) { }

  @Post()
  create(@Body('nome') nome: string) {
    return this.culturasService.create(nome);
  }

  @Get()
  findAll() {
    return this.culturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culturasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCulturaDto: Partial<{ nome: string }>) {
    return this.culturasService.update(id, updateCulturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culturasService.remove(id);
  }
}