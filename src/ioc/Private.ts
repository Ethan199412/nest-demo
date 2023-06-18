class B {
    num: number
    constructor(num){
        this.num = num
    }
    action() {
        console.log('I like eating')
    }
}
class A {
    // 在构造函数里如果指定了 private，那么 b 就是 A 上面的一个属性了
    // 相当于 this.b = b
    // 如果在构造函数里指明了 readonly 在构造函数里是可以修改的，但是
    // 出了构造函数意外的地方修改是不可以的

    constructor(private readonly b: B) {
        this.b = new B(4)
    }

    change(){
        // this.b = new B(3)
    }
}

const a = new A(new B(2))
// a.change()
console.log({a})