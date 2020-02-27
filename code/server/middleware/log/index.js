import logger from './log'

export default () => {
    let log = logger()
    return async (ctx, next) => {
        // console.log(log(ctx, next))
        console.log(ctx.response.status)
        return log(ctx, next)
        .catch(e => {
            console.log('error: ' ,e)
            // if(ctx.status < 500) {
            //     ctx.status = 500
            // }
            // ctx.log.error(e.stack)
            // ctx.state.logged = true
            // ctx.throw(e)
        })
        // await next()
    }
}