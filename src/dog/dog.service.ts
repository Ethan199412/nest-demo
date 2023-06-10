import { Injectable } from "@nestjs/common";

@Injectable()
export class DogService {
    getAll() {
        console.log('main func')
        return [{
            name: '柴犬',
            number: 10
        }, {
            name: '柯基',
            number: 6
        }]
    }
}