import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { MarketEntity, TypeormDemoEntity } from './typeorm-demo.entity';

@Injectable()
export class TypeormDemoService {
    constructor(
        @InjectRepository(TypeormDemoEntity)
        private readonly typeormDemoRepository: Repository<TypeormDemoEntity>,

        @InjectRepository(MarketEntity)
        private readonly marketRepository: Repository<MarketEntity>,
    ) {

    }

    async getAll() {
        return await this.typeormDemoRepository.find()
    }

    async test() {
        const conditions = [{ region: 'SG', version: '3.04.2' }, { region: 'MY', version: '3.04.3' }]
        // return await this.typeormDemoRepository.createQueryBuilder().select('*')
        //     .where(conditions)
        //     .getRawMany()

        // const res = await this.marketRepository.createQueryBuilder()
        //     .select(['region', 'version', 'MAX(submission_date) as max_date'])
        //     .where(conditions)
        //     .groupBy('region, version')
        //     .getRawMany()

        const res = await this.marketRepository.createQueryBuilder('t1').select('*')
            .innerJoin(subquery => {
                return subquery.select(['region', 'version', 'MAX(submission_date) as max_date'])
                    .from(MarketEntity, 't2')
                    
                    .andWhere(new Brackets(qb => {
                        qb.where(conditions)
                    }))
                    .groupBy('region, version')
                    .having('region = :region', { region: 'SG' })
            }, 't2', 't1.version=t2.version and t1.region = t2.region and t2.max_date = t1.submission_date')
            // .getQuery()
            .getRawMany()

        return res



        // return await this.typeormDemoRepository.createQueryBuilder('t1').select(['t1.id','t1.version',]).getOne()
        // 一般有 join 的时候就需要用 getRawMany
        // return await this.typeormDemoRepository
        //     .createQueryBuilder('t1')
        //     .select(['*', 't2.*'])
        //     .innerJoin(MarketEntity, 't2', 't1.region = t2.region and t1.version = t2.version').getRawMany()

        // return await this.marketRepository.find()

    }

    async sub() {
        // innerjoin 的三个参数，subquery 别名还有条件
        return await this.typeormDemoRepository
            .createQueryBuilder('t1')
            .select("t1.create_date create_date")
            .addSelect("t1.region region")
            .innerJoin(
                subQuery =>
                    subQuery
                        .select("MAX(version) max_ver")
                        .addSelect("region")
                        .from("app_store_tab", "t2")
                        .groupBy("region"),
                "t2",
                "t1.version = t2.max_ver AND t1.region = t2.region"
            ).getRawMany();
    }

    async maxRecord() {
        const subQuery = this.typeormDemoRepository
            .createQueryBuilder()
            .select('MAX(create_date) max_create_date').getQuery();

        // 这里千万别忘了加小括号
        return await this.typeormDemoRepository
            .createQueryBuilder()
            .where(`create_date IN (${subQuery})`)
            .getOne();

    }

    async saveAndReturnId(record: MarketEntity) {
        const { id } = await this.marketRepository.save(record)
        return id
    }
}