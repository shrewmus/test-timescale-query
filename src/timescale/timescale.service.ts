import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from '../entities/sensor.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TimescaleService {
  constructor(
    @InjectRepository(SensorEntity)
    private readonly sensorRepository: Repository<SensorEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(sensorReadings: Partial<SensorEntity>) {
    return await this.sensorRepository.save(sensorReadings);
  }

  /**
   * READ WEEKLY DATA
   * @param sensorId
   */
  async getWeeklyAverage(sensorId: number) {
    const query = `
    SELECT 
      time_bucket('1 week', timecol) as week,
      AVG((readings->>'temperature')::float) as temperature,
      AVG((readings->>'humidity')::float) as humidity
    FROM sensor_entity
    WHERE "sensorId" = $1
        AND timecol >= date_trunc('year', now())
    GROUP BY week
    ORDER BY week;
    `;

    const result = await await this.sensorRepository.query(query, [sensorId]);
    console.log('[TEST] result', result);
    return result;
  }

  /**
   * MOCK DATA
   */
  async mockData() {
    const sensorsCount = 15;
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date());
    const interval = 30; // each 30 minutes
    let id = 10;

    const batchSize = 300;
    const mockData: any[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // loop through the year, each interval minutes
      for (let i = 1; i <= sensorsCount; i++) {
        id += 1;
        // for each time iteration generate random data for each sensor
        mockData.push({
          id: id,
          sensorId: i, // for simplicity, we will use the loop index as sensorId
          timecol: currentDate,
          location: { lat: 0, lng: 0 },
          readings: {
            temperature: (Math.random() * 100).toFixed(2),
            humidity: (Math.random() * 100).toFixed(2),
            salinity: (Math.random() * 100).toFixed(2),
          },
        });
        if (mockData.length >= batchSize) {
          const qb = this.dataSource.getRepository(SensorEntity).createQueryBuilder()
            .insert()
            .into(SensorEntity)
            .values(mockData);

          const sql = qb.getSql();
          console.log('[QUERY]', sql);
          await qb.execute();
          mockData.length = 0;
        }
      }
      currentDate.setMinutes(currentDate.getMinutes() + interval);
    }
    if (mockData.length) {
      await this.dataSource.getRepository(SensorEntity).createQueryBuilder()
        .insert()
        .into(SensorEntity)
        .values(mockData)
        .execute();
    }
  }
}
