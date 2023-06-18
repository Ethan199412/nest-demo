import 'reflect-metadata';

function classMetadata(key, value) {
    // 这个 target 是类本身
    return function(target){
        Reflect.defineMetadata(key, value, target)
    }
}

function methodMetadata(key, value) {
    // 这个 target 是类的 prototype
    return function(target, propertyName){
        Reflect.defineMetadata(key, value, target, propertyName)
    }
}

@classMetadata('name', 'laowang')
class Person {
    @methodMetadata('name', 'run so fast')
    skill():string {
        return  '来人就跑！来抓我啊！'
    }
}

console.log(new Person())
console.log(Reflect.getMetadata('name', Person)) // laowang
console.log(Reflect.getMetadata('name', Person.prototype, 'skill')) // run so fast