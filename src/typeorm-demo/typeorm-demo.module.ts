import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormDemoController } from './typeorm-demo.controller';
import { MarketEntity, SubmitEntity, TypeormDemoEntity } from './typeorm-demo.entity';
import { TypeormDemoService } from './typeorm-demo.service';

@Module({
    imports: [TypeOrmModule.forFeature([SubmitEntity,TypeormDemoEntity, MarketEntity])],
    providers: [TypeormDemoService],
    controllers: [TypeormDemoController],
})
export class TypeormDemoModule {}
