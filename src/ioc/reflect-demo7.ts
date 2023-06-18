import 'reflect-metadata';

class A {
  skill() {
    console.log('助人为乐最快乐');
  }
}

class Hobby { }
const Test = (): ClassDecorator => (target) => { };

@Test()
class Person {
  constructor(hobby: Hobby) { }
}

function Module(metadata) {
  const propsKeys = Object.keys(metadata);
  console.log('[p0.1]', { propsKeys })
  // target 是 C
  return (target) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        console.log('[p0.2]', { property, metadata, target })
        Reflect.defineMetadata(property, metadata[property], target); // property: 'controllers' | 'provides'
        // 往 target，即C 的metadata 上设置键值对。
      }
    }
  };
}

@Module({
  controllers: [Person],
  providers: [Hobby],
})
class C { }

interface Type<T> {
  new(...args: any[]): T;
}

interface ClassProvider<T> {
  provide: Type<T>;
  useClass: Type<T>;
}


class Container {
  providers = new Map<Type<any>, ClassProvider<any>>();
  /**
   * 注册
   */
  addProvider<T>(provider: ClassProvider<T>) {
    this.providers.set(provider.provide, provider);
  }
  /**
   * 获取,拿到类
   */
  inject(token: Type<any>) {
    return this.providers.get(token)?.useClass;
  }
}

type Constructor<T = any> = new (...args: any[]) => T;

const Factory = <T>(target: Constructor<T>) => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('providers', target);
  console.log('[p0.5]',{providers})
  // 下面的Continer就是我们之前建立的数据仓库，我们把依赖放进去
  const continer = new Container();
  for (let i = 0; i < providers.length; i++) {
    // providers[i] 是类
    continer.addProvider({ provide: providers[i], useClass: providers[i] })
  }
  console.log('[p0.3]', { continer })

  const controllers = Reflect.getMetadata('controllers', target);
  for (let i = 0; i < controllers.length; i++) {
    //  controllers[i] 构造函数参数被放到了'design: paramtypes'标识符上
    const currNeedProviders = Reflect.getMetadata('design:paramtypes', controllers[i]);
    const args = currNeedProviders.map((provider) => continer.inject(provider));
    console.log('[p0.4]',{currNeedProviders, args})
    new currNeedProviders[0](...args)
  }
  // return new target(...args);
};

Factory(C)

// const providers = Reflect.getMetadata('providers', C);
// const controllers = Reflect.getMetadata('controllers', C);
// console.log('[p0.3]',{providers, controllers})