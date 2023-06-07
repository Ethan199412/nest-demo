import { of, Observable, interval, take } from 'rxjs'
import { map } from 'rxjs'
const sub = interval(500).pipe(map(v => ({ num: v }))).subscribe(e => {
    console.log(e)
    if(e.num == 10){
        sub.unsubscribe()
    }
})

console.log('[p0.0]', map(e => ({ num: e })))