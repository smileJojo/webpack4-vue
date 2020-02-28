
/**
 * 返回客户端IP
 * @param {object} ctx - koa 返回的context.
 */

 import ip from 'ip'

export const get_client_ip = ctx => {
    // return ctx.request.headers['x-forwarded-for'] ||
    //     (ctx.request.connection && ctx.request.connection.remoteAddress) ||
    //     ctx.request.socket.remoteAddress ||
    //     (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) ||
    //     null
    return ip.address()
}