import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Produtor } from './database/entities/produtor.entity';
import { Fazenda } from './database/entities/fazenda.entity';
import { ProdutoresModule } from './produtores/produtores.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FazendasModule } from './fazendas/fazendas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5432', 10),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [Produtor, Fazenda, __dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') === 'production' ? false : true,
      }),
    }),
    ProdutoresModule,
    DashboardModule,
    FazendasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
