import { Controller, Get } from '@nestjs/common';
import { TypeormDemoService } from './typeorm-demo.service';

@Controller('typeorm-demo')
export class TypeormDemoController {
    constructor(private readonly typeormDemoService: TypeormDemoService){

    }
    @Get('test')
    async test(){
        return await this.typeormDemoService.sub()
    }
}
