import { of, Observable } from 'rxjs';

const observable = new Observable(subscribe => {
    subscribe.next(1)
    subscribe.next(2)
    subscribe.next(3)

    setTimeout(() => {
        subscribe.next(4)
        subscribe.complete()
    }, 3000)
})

observable.subscribe({
    next: (num) => {
        console.log(num)
    }
})