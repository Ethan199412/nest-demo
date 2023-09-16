import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TypeormDemoService } from './typeorm-demo.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiProduces, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

class CreateDto {
    @ApiProperty({ example: '小满', type: 'string', required: false })
    name: string
    @ApiProperty({ example: 18, type: 'number' })
    age: number
}

@Controller('typeorm-demo')
@ApiBearerAuth()
@ApiTags('typeorm demo')
export class TypeormDemoController {
    constructor(private readonly typeormDemoService: TypeormDemoService) {

    }
    @Get('test')
    @ApiOperation({ summary: 'test 接口', description: '描述' })
    // @ApiQuery({ name: 'page', description: '分页信息' })
    // @ApiResponse({ status: 403, description: '小黑子我是 403' })
    async test() {
        // return await this.typeormDemoService.sub()
        // return await this.typeormDemoService.maxRecord()
        // return await this.typeormDemoService.saveAndReturnId({
        //     update_market_materials: true,
        //     region: 'SG',
        //     version: '3.04.2'
        // })
        return await this.typeormDemoService.test()
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: '这是一个id', required: true })
    async find(@Param('id') id: string) {
        return id
    }

    @Post('create')
    async create(@Body() body: CreateDto) {

    }
}
