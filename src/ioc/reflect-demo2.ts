import 'reflect-metadata'
class MyClass {
    @Reflect.metadata('key', 'value')
    myMethod() {
        // ...
    }
}

const metadataValue = Reflect.getMetadata('key', MyClass.prototype, 'myMethod');
console.log(metadataValue); // 输出：'value'