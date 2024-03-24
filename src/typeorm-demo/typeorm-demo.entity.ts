// photo.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_store_tab')
export class TypeormDemoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column({ type: 'datetime' })
  create_date: Date;

  @Column()
  version: string;
}

@Entity('app_store_market_tab')
export class MarketEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  region: string;

  @Column()
  version: string;

  @Column({ type: 'tinyint' })
  update_market_materials: boolean;

  @Column({ type: 'datetime' })
  submission_date: Date;
}

@Entity('submit_tab')
export class SubmitEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type:'datetime'})
  publish_time: Date;

  @Column()
  resource_id: number;

  @Column()
  resource_name: string;

  @Column()
  submit_status: string;

  @Column()
  resource_version: string;

  @Column()
  translation_version: string;
}
