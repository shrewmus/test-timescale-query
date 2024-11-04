import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiseaseRiskEntity } from './entities/disease-risk.entity';
import { SensorEntity } from './entities/sensor.entity';
import { TimescaleModule } from './timescale/timescale.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tscale',
      password: 'password',
      database: 'tscale',
      autoLoadEntities: true,
      synchronize: true,
      entities: [DiseaseRiskEntity, SensorEntity],
      logging: ['query', 'error'],
    }),
    TimescaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
