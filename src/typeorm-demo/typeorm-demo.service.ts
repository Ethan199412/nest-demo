import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        // return await this.typeormDemoRepository.createQueryBuilder('t1').select(['t1.id','t1.version',]).getOne()
        // 一般有 join 的时候就需要用 getRawMany
        return await this.typeormDemoRepository
            .createQueryBuilder('t1')
            .select(['*', 't2.*'])
            .innerJoin(MarketEntity, 't2', 't1.region = t2.region and t1.version = t2.version').getRawMany()

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
}
