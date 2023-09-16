// photo.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_store_tab')
export class TypeormDemoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column({type: 'datetime'})
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

  @Column({type: 'tinyint'})
  update_market_materials: boolean;

  @Column({type:'datetime'})
  submission_date: Date;

}