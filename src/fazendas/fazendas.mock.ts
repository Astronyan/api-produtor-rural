export const mockCreateFazendaDto = {
    nome: 'Fazenda Teste',
    cidade: 'Teste',
    estado: 'TS',
    areaTotalHa: 100,
    areaAgricultavelHa: 60,
    areaVegetacaoHa: 40,
    produtorId: 'uuid-produtor',
  };
  
  export const mockFazenda = {
    id: 'uuid-fazenda',
    ...mockCreateFazendaDto,
    produtor: { id: 'uuid-produtor', nome: 'João da Silva', documento: '12345678901' },
  };