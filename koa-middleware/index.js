// 导入 koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa')
// 创建一个 Koa 对象表示 web app 本身
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    // 打印URL
    console.log(`${ctx.request.method} ${ctx.request.url}`)
    // 调用下一个 middleware
    await next()
})

app.use(async (ctx, next) => {
    // 当前时间
    const start = new Date().getTime()
    // 调用下一个middleware
    await next()
    // 耗费时间
    const ms = new Date().getTime() - start
    // 打印耗费时间
    console.log(`Time: ${ ms }ms`)
})

app.use(async (ctx, next) => {
    // 调用下一个middleware
    await next()
    // 设置 response 的 Content-Type:
    ctx.type = 'text/html'
    // 设置 response 的内容:
    ctx.body = '<h1 style="color: red;">北京--上海--天津--武汉--四川--广州</h1>'
})

app.listen(3000, (res) => {
    console.log('app started at port 3000....')
})

/* 

middleware的顺序很重要，也就是调用 app.use() 的顺序决定了 middleware 的顺序
此外，如果一个 middleware 没有调用 await next() 会怎么办？答案是 后续的middleware将不再执行了
最后，ctx对象有一些简写的方法，例如 ctx.url 相当于 ctx.request.url，ctx.type 相当于 ctx.response.type

*/