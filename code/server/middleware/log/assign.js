/**
 * 返回日志内容
 * @constructor
 * @param {object} ctx - koa 返回的context.
 * @param {object} msg - 返回日志内容.
 * @param {object} commonInfo  返回公共日志
 */

export default (ctx, msg, comonInfo) => {
    const { method, url, host, headers } = ctx.request
    const client = {
        method,
        url,
        ip: ctx.get_client_ip(ctx),
        host,
        referer: headers['referer'],
        userAgent: headers['user-agent'],
        msg: msg,
    }
    return JSON.stringify(Object.assign(comonInfo, client))
}