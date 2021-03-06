import path from 'path'
import staticFiles from 'koa-static'
import Send from './send'
import Rules from './rule'
import Log from './log'
import Func from './funs'


export default app => {

    //缓存拦截器
    app.use(async (ctx, next) => { 
        console.log('拦截con1')
        if (ctx.url == '/favicon.ico') return
        // if(ctx.status < 500) {
        //     return
        // }

        await next()
        ctx.status = 200
        ctx.set('Cache-Control', 'must-revalidation')
        if (ctx.fresh) {
            ctx.status = 304
            return
        }
    })

    
    // 方法封装
    app.use(Func())

    // 数据返回的封装
    app.use(Send())

    //
    Rules({
        app,
        rules: [{name: 'client', path:path.join(__dirname, '../controller/client')}]
    })

    // 日志中间件
    app.use(Log())

   

    // 静态文件中间件
    app.use(staticFiles(path.resolve(__dirname, '../../../public')))

    

     

    //  增加错误监听处理
    app.on('error', (err, ctx) => {
        debugger
        if(ctx && !ctx.headerSent && ctx.status < 500){
            ctx.status = 500
        }
        if(ctx && ctx.log && ctx.log.error){
            if(!ctx.state.logged){
                ctx.log.error(err.stack)
            }
        }
        console.log(err, ctx)
    })
}