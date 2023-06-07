import { Injectable } from "@nestjs/common";

@Injectable()
export class DogsService {
    getAll() {
        return [{
            name: '柴犬',
            number: 10
        }, {
            name: '柯基',
            number: 6
        }]
    }
}