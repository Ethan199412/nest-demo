import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
    getAll() {
        return [{
            name: '金渐层',
            number: 10
        }, {
            name: '橘猫',
            number: 6
        }]
    }
}