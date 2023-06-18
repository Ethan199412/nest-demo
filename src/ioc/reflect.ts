import 'reflect-metadata'

const person: any = {};

Reflect.defineMetadata('name', 'laowang', person)
Reflect.defineMetadata('name', 'run so fast', person, 'skill')

console.log(person.__proto__)
console.log(Reflect.getOwnMetadata('name', person))
console.log(Reflect.getOwnMetadata('name', person, 'skill'))
