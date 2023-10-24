import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 这个里面的 person 对应的是 table 名
@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
