// 导入koa，和koa1.x不同，在koa2中，我们导入的是一个class，因此使用大写的Koa表示
const Koa = require('koa')
// 注意 require('koa-router') 返回的是一个函数
const router = require('koa-router')()
// 创建一个koa对象表示 web app 本身
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

// add url-route
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}</h1>`
})

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>'
})

// add router middleware
app.use(router.routes())
app.listen(3000)
console.log('app started at port 3000...')
