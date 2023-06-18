import * as http from 'http'
export interface Route {
    method?: string,
    path?: string,
    fn?: (...args: any) => void,
    params?: any
}

export interface App {
    listen: (number) => void,
    routes: Route[]
    use?: (...args: any) => void
}

export function appWrapper() {
    //增加监听方法
    this.listen = function (port) {
        console.log('[p2.0] port', port)
        http.createServer(this).listen(port);
        console.log('server run on ', port)
    };

    this.routes = [];
    //增加get方法
    var methods = ['get', 'post', 'delete', 'put', 'options'];
    methods.forEach((method) => {
        this[method] = function (path, fn) {
            const config: any = { method, path, fn };
            if (path.includes(":")) {
                //是路径参数 转换为正则
                //并且增加params
                var arr = [];
                config.path = path.replace(/:([^/]+)/g, function () {
                    arr.push(arguments[1]);
                    return '([^/]+)';
                });
                config.params = arr;
            }
            this.routes.push(config);
        };
    });

    this.use = function (path, fn) {
        // 我不认可这种写法，我会用 args 来改造
        // 纯粹为了满足两种情况
        if (typeof fn !== 'function') {
            fn = path;
            path = '/';
        }
        this.routes.push({ method: 'middle', path, fn });
    }
}