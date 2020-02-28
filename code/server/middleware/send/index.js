/**
 * 格式拦截，挂载send 和 sendError 到ctx
 * @param {object} json - 接口返回数据
 * @param { msg } string - 错误提示 
 */

export default () => {
    let render = ctx => {
        console.log('拦截con3-render')
        return (json, msg) => {
            console.log(ctx.status)
            ctx.set('Content-Type', 'application-json')
            ctx.body = {
                code: 1,
                data: json || {},
                msg: msg || 'success'
            }
            console.log(ctx.status)
        }

    }

    let renderError = ctx => {
        return msg => {
            console.log('-------sendError:'+msg)
            ctx.set('Content-Type', 'application-json')
            ctx.body = JSON.stringify({
                code: 0,
                data: {},
                msg: msg.toString()
            })
        }
    }

    return async (ctx, next) => {
        console.log('拦截con3')
        ctx.send = render(ctx)
        ctx.sendError = renderError(ctx)
        await next()
    }
}