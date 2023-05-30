import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "src/person/person.controller";
import { PersonEntity } from "src/person/person.entity";
import { PersonService } from "src/person/person.service";

@Module({
    imports: [TypeOrmModule.forFeature([PersonEntity])],
    providers: [PersonService],
    controllers: [PersonController],
})
export class PersonModule { }