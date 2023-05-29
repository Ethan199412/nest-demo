import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "src/controller/person.controller";
import { PersonEntity } from "src/entity/person.entity";
import { PersonService } from "src/service/person.service";

@Module({
    imports: [TypeOrmModule.forFeature([PersonEntity])],
    providers: [PersonService],
    controllers: [PersonController],
})
export class PersonModule { }