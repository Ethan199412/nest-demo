import http from 'http'

const app: any = function () {
    console.log('app')
    app.child = function () {
        console.log('child')
    }
}

// 一个函数上也能挂其他函数
app()
app.child()