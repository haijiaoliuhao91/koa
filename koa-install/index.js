// 导入koa，和koa 1.x 不同，在 koa2中，我们导入的是一个 class，因此用大写的Koa表示
const Koa = require('koa')

// 创建一个Koa对象表示 web app 本身
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    await next()
    // 设置 response 的 Content-Type:
    ctx.response.type = 'text/html'
    // 设置 response 的内容:
    ctx.response.body = '<h1 style="color: green;">Hello, koa2!</h1>'
})

// 在端口 3000 监听
app.listen(3000, () => {
    console.log('sever is starting at port 3000!')
})

/*

    对于每一个http请求，koa将调用我们传入的异步函数来处理：
    async (ctx, next) => {
        await next()
        // 设置 response 的 Content-Type:
        ctx.response.type = 'text/html'
        // 设置 response 的内容:
        ctx.response.body = '<h1 style="color: green;">Hello, koa2!</h1>'
    }

    其中，参数 ctx 是由Koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是Koa传入的将要处理的下一个异步函数。
    上面的异步函数中，我们首先用 await next() 处理下一个异步函数，然后，设置response的Content-Type和内容
    
    由 async 标记的函数称为异步函数，在异步函数中，可以用 await 调用另一个异步函数

    每收到一个http请求，koa 就会调用通过 app.use() 注册的 aysnc 函数，并传入 ctx 和 next 参数
    我们可以对 ctx 操作，并设置返回内容。但是为什么要调用 awiat next() ?

    原因是 koa 把很多 async 函数组成一个处理链，每个 async 函数都可以做一些自己的事情，然后用 await next() 来调用下一个async函数。
    我们把每一个 async 函数称为 middleware，这些 middleware 可以组合起来，完成很多有用的功能。
*/