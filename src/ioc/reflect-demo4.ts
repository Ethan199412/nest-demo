import 'reflect-metadata';

class A {
    skill() {
        console.log('助人为乐最快乐');
    }
}

class B {
    skill() {
        console.log('逃跑翻墙真的爽');
    }
}

function Module(metadata) {
    console.log({ metadata })
    const propsKeys = Object.keys(metadata);
    // 这个返回的函数才是类装饰器，target 是 C 类
    return (target) => {
        console.log({target})
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[property], target);
            }
        }
    };
}

@Module({
    controllers: [B],
    providers: [A],
})
class C { }

const providers = Reflect.getMetadata('providers', C);
const controllers = Reflect.getMetadata('controllers', C);

console.log(providers, controllers); // [ [class A] ] [ [class B] ]