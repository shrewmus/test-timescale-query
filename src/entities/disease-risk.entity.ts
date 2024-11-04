import { Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class DiseaseRiskEntity {
  @PrimaryColumn()
  id: number;

  @Column('jsonb', { nullable: false })
  location: { lat: number; lng: number };

  @Column({ nullable: false })
  riskLevel: number;

  @Column('jsonb', { nullable: false })
  diseaseData: { modelName: string; isPercentage: boolean };

  @PrimaryColumn('timestamptz')
  timecol: Date;
}
