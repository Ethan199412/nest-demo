import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PersonDto } from "src/person/person.dto";
import { PersonEntity } from "src/person/person.entity";
import { PersonService } from "src/person/person.service";

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Get()
  findAll(): Promise<PersonEntity[]> {
    return this.personService.findAll();
  }

  @Post('create')
  create(@Body() personDto: PersonDto): Promise<PersonEntity> {
    return this.personService.create(personDto)
  }

  @Post('delete/:id')
  delete(@Param('id') id: number) {
    return this.personService.delete(id)
  }

  @Post('update/:id')
  update(@Param('id') id: number, @Body() personDto: PersonDto) {
    return this.personService.update(personDto)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PersonEntity> {
    return this.personService.findOne(id)
  }
}