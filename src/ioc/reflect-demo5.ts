import 'reflect-metadata';

interface Type<T> {
  new (...args: any[]): T;
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

  inject(token: Type<any>){
    return this.providers.get(token)?.useClass;
 }
}

class Laowang {
  age: 93;
}
const container = new Container();

container.addProvider<Laowang>({ provide: Laowang, useClass: Laowang });

// console.log(container.providers)
console.log(container.inject(Laowang));