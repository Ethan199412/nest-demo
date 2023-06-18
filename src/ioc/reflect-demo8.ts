import 'reflect-metadata';

function Test(target){

}

class B{

}

@Test
class A {
  constructor( b: B) {

  }
}

// A 必须至少有一个装饰器才能这么用，如果没有 @Test 是拿不到的
const param = Reflect.getMetadata('design:paramtypes', A)

console.log('[p0.0]', param)