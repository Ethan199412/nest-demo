import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonDto } from "src/dto/person.dto";
import { PersonEntity } from "src/entity/person.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(PersonEntity)
        private readonly personRepository: Repository<PersonEntity>,
    ) { }

    async findAll(): Promise<PersonEntity[]> {
        const res = await this.personRepository.find();
        console.log('[p0.0] res', res)
        return res
    }

    async create(personDto: PersonDto): Promise<PersonEntity> {
        return await this.personRepository.save(personDto)
    }

    async delete(id: number) {
        return await this.personRepository.delete(id)
    }

    async update(personDto: PersonDto) {
        return await this.personRepository.update(personDto.id, personDto)
    }

    async findOne(id: number): Promise<PersonEntity> {
        return await this.personRepository.findOneById(id)
    }
}