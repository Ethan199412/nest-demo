import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  MarketEntity,
  SubmitEntity,
  TypeormDemoEntity,
} from './typeorm-demo.entity';

@Injectable()
export class TypeormDemoService {
  constructor(
    @InjectRepository(TypeormDemoEntity)
    private readonly typeormDemoRepository: Repository<TypeormDemoEntity>,

    @InjectRepository(MarketEntity)
    private readonly marketRepository: Repository<MarketEntity>,

    @InjectRepository(SubmitEntity)
    private readonly submitRep: Repository<SubmitEntity>,
  ) {}

  async getAll() {
    return await this.typeormDemoRepository.find();
  }

  async test() {
    const publish_time = new Date('2024-1-1');

    // return await this.submitRep.find();
    // return await this.submitRep.find();
    const subquery = this.submitRep
      .createQueryBuilder()
      .select(['MAX(publish_time) publish_time', 'resource_id'])
      .where('publish_time <= "2024-1-1"')
      .groupBy('resource_id').getQuery();

    return this.submitRep
      .createQueryBuilder('t1')
      .innerJoin(
        `(${subquery})`,
        't2',
        't1.publish_time = t2.publish_time AND t1.resource_id = t2.resource_id',
      )
      .getRawMany();

    // return this.submitRep
    //   .createQueryBuilder('t1')s
    //   .innerJoin(
    //     (subQuery) =>
    //       subQuery
    //         .select('MAX(publish_time)', 'publish_time')
    //         .addSelect('resource_id')
    //         .where('publish_time <= :publish_time', { publish_time })
    //         .from(SubmitEntity, 't2')
    //         .groupBy('resource_id'),
    //     't2',
    //     't1.publish_time = t2.publish_time AND t1.resource_id = t2.resource_id',
    //   )
    //   .getRawMany();
  }

  async sub() {
    // innerjoin 的三个参数，subquery 别名还有条件
    return await this.typeormDemoRepository
      .createQueryBuilder('t1')
      .select('t1.create_date create_date')
      .addSelect('t1.region region')
      .innerJoin(
        (subQuery) =>
          subQuery
            .select('MAX(version) max_ver')
            .addSelect('region')
            .from('app_store_tab', 't2')
            .groupBy('region'),
        't2',
        't1.version = t2.max_ver AND t1.region = t2.region',
      )
      .getRawMany();
  }

  async maxRecord() {
    const subQuery = this.typeormDemoRepository
      .createQueryBuilder()
      .select('MAX(create_date) max_create_date')
      .getQuery();

    // 这里千万别忘了加小括号
    return await this.typeormDemoRepository
      .createQueryBuilder()
      .where(`create_date IN (${subQuery})`)
      .getOne();
  }

  async saveAndReturnId(record: MarketEntity) {
    const { id } = await this.marketRepository.save(record);
    return id;
  }
}
