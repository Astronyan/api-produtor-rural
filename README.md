# API Produtor Rural

API para gerenciamento de produtores rurais, fazendas e culturas plantadas.
Disponível publicamente em: [api.produtorrural.sobremail](https://api.produtorrural.sobremail.com/api)
obs: Fiz apenas o setup básico do swagger (com IA), não deu tempo de documentar tão bem, por o tempo ser bem estreito.

## Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- PostgreSQL

## Instalação

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Configure o ambiente (veja `.env.example`).

## Configuração do Ambiente

O projeto utiliza variáveis de ambiente para configurações de banco de dados e outros parâmetros.  
Copie o arquivo `.env.example` para `.env.dev` (desenvolvimento) ou `.env.prod` (produção), dependendo do ambiente desejado.

## Execução

**Desenvolvimento:**
```
docker-compose -f docker-compose.dev.yml up
npm run start:dev
```

**Produção:**
```
docker-compose -f docker-compose.prod.yml up
```

## Testes

npm run test

## Rotas principais

- **Produtores:** `/produtores`
- **Fazendas:** `/fazendas`
- **Culturas:** `/culturas`
- **Dashboard:** `/dashboard`

## Especificação OpenAPI

Acesse `/api` para visualizar a documentação Swagger.
