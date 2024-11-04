import { Controller, Get, Post, Query } from '@nestjs/common';
import { TimescaleService } from './timescale.service';

@Controller('timescale')
export class TimescaleController {
  constructor(private readonly timescaleService: TimescaleService) {}

  @Get('weekly-averages')
  async getWeeklyAverages(@Query('sensorId') sensorId: number) {
    return this.timescaleService.getWeeklyAverage(sensorId);
  }

  @Post('mock-data')
  async mockData() {
    return this.timescaleService.mockData();
  }
}
