import 'reflect-metadata';

type Constructor<T = any> = new (...args: any[]) => T;

const Test = (): ClassDecorator => (target) => {
  console.log('[p1.0]', { target })
};

class OtherService {
  a = 1;
}

@Test()
class TestService {
  constructor(public readonly otherService: OtherService) { }

  testMethod() {
    console.log(this.otherService.a);
  }
}

// VI 构造函数参数被放到了'design: paramtypes'标识符上
const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]

  // args 是 otherService 的实例，包了一层数组
  const args = providers.map((provider: Constructor) => new provider());
  console.log({ providers, args })
  // 这里的 target 是一个类
  return new target(...args);
};

Factory(TestService).testMethod(); // 1