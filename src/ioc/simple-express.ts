import { App, appWrapper, Route } from "./app-helper";
import * as url from 'url'
import { resWrapper } from "./res-wrapper";

function express() {
  const app = function (req, res) {
    resWrapper.call(res)
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const method = req.method.toLowerCase();
    req.path = pathname;
    req.hostname = req.headers['host'].split(':')[0];
    req.query = urlObj.query;

    //找到匹配的路由
    let index = 0;
    function next(err?: any) {
      if (index >= app.routes.length) {
        return res.end(`CANNOT  ${method} ${pathname}`);
      }
      const route: Route = app.routes[index++];

      console.log('[p3.3] err', err, route.fn.length, 'index', index - 1, route)
      if (route.params) {
        const matchers = pathname.match(new RegExp(route.path));
        if (matchers) {
          const params = {};
          for (var i = 0; i < route.params.length; i++) {
            params[route.params[i]] = matchers[i + 1];
          }
          req.params = params;
          route.fn(req, res);
          return
        } else {
          next(err);
          return
        }
      }

      if (route.method == 'middle') {
        // 错误中间件
        if (err) {
          // 有了错误就不能再 next 了。
          if (route.fn.length == 4) {
            route.fn(err, req, res, next)
            return
          }
          console.log('[p3.4] err', err)
          next(err)
          return
        }

        // 普通中间件
        if (route.fn.length == 3) {
          if (route.path == '/' || pathname.startsWith(route.path + '/') || pathname == route.path) {
            console.log('[1.3] 匹配了中间件')
            route.fn(req, res, next)
            return
          }
          next(err);
          return
        }
      }

      // 如果是普通路由
      // 找到了匹配的路由
      if ((route.path == pathname || route.path == '*') && (route.method == method || route.method == 'all')) {
        console.log('[p1.2] 匹配上了')
        route.fn(req, res);
        return
      }
      next(err);
    }

    next();
  } as any as App;
  appWrapper.call(app)

  return app as any;
}

const app = express()
app.listen(3000)

app.use((req, res, next) => {
  console.log('过滤石头')
  req.num = req.num ? req.num + 1 : 1
  next()
})

app.get('/name', (req, res) => {
  // console.log('[p0.2]', { req, res })
  res.end('haha name')
})
app.post('/boy', (req, res) => {
  res.end('boy next door')
})

app.use('/water', function (req, res, next) {
  console.log('过滤沙子');
  req.num = req.num ? req.num + 1 : 1
  next();
});

app.use(function (err, req, res, next) {
  console.log('err', err);
  res.end('err:' + err);
});

app.get('/json', function (req,res) {
  res.send({obj:1});
});



// app.get('*', (req, res) => {
//   console.log('path is *')
//   res.end('hehe')
// })

app.get('/water', function (req, res) {
  req.num = req.num ? req.num + 1 : 1
  res.end('water: ' + req.num + ',query:' + JSON.stringify(req.query));
});

app.get('/water/:id/:name/home/:age', function (req, res) {
  console.log(req.params);
  res.end('water'+JSON.stringify(req.params));
});

console.log('[p0.0] routes', app.routes)



module.exports = express;