export default () => {
    let render = ctx => {
        return (json, msg) => {
            console.log(ctx, json)
            ctx.set('Content-Type', 'application-json')
            ctx.body = {
                code: 1,
                data: json || {},
                msg: 'success'
            }
        }
    }

    let renderError = ctx => {
        
        return message => {
            console.log('-------sendError:'+message)
            ctx.set('Content-Type', 'application-json')
            ctx.body = JSON.stringify({
                code: 0,
                data: {},
                msg: message.toString()
            })
        }
    }

    return async (ctx, next) => {
        ctx.send = render(ctx)
        ctx.sendError = renderError(ctx)
        await next()
    }
}