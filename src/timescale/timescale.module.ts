import { Module } from '@nestjs/common';
import { TimescaleService } from './timescale.service';
import { TimescaleController } from './timescale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from '../entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorEntity])],
  providers: [TimescaleService],
  controllers: [TimescaleController],
})
export class TimescaleModule {}
