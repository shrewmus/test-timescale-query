import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SensorEntity {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn({ type: 'timestamptz' })
  timecol: Date;

  @Column('jsonb', { nullable: false })
  location: { lat: number; lng: number };

  @Column({ nullable: false })
  sensorId: number;

  @Column({ type: 'jsonb' })
  readings: { temperature: number; humidity: number; salinity: number };
}
