class Hobby{
    constructor(gender){
        return [gender, '助人为乐']
    }
}

class Skill{
    constructor(){
        return ['送帽子','跑路']
    }
}

class Person{
    hobby: Hobby
    skill: Skill
    constructor(){
        this.hobby = new Hobby('女')
        this.skill = new Skill()
    }
}

console.log(new Person())