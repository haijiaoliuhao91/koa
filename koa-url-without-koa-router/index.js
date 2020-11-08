// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa')
// 创建一个koa对象表示 web app本身
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求:
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.body = 'index page'
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.body = 'test page'
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path === '/error') {
        ctx.body = 'error page'
    } else {
        await next()
    }
})

app.listen(3000, () => {
    console.log('app started at port 3000...')
})

/* 

    正常情况下，我们应对不同的URL调用不同的处理函数，这样才能返回不同的结果。上面的写法是可以运行的，但是有点蠢
    应该有一个能集中处理URL的middlware，它根据不同的URL调用不同的处理函数，这样我们才能为每个URL编写处理函数。

*/