/* 接口地址路由 */

import koaRouter from 'koa-router'

const router = koaRouter()

export default app => {
    console.log('~~~~~~:',app.client)
    // app.client.blog.info => rule/index -> controller/client 下产生的function

    router.get("/info", app.client.blog.info)

    app.use(router.routes()).use(router.allowedMethods())
    /*
    * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
    * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
    * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
    *
    */
}