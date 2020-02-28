/**
 * 将log对象挂载到ctx上，并打印日志
 * @constructor
 * @param {object} options - 日志options.
 */

import log4js from 'log4js'
import config from '../../config'
import assign from './assign'

const levels  = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
// 提取默认公用参数对象
const baseInfo = config.log

export default (options = {}) => {
    let contextLogger = {}, // 错误日志等级对象，最后会赋值给ctx,用于打印各种日志
        appenders = {}, //日志配置
        opts = Object.assign({}, baseInfo, options),
        {logLevel, dir, ip, projectName} = opts,
        commonInfo = { projectName, ip } //存储公用的日志信息




    

    // 环境变量为dev local development 认为是开发环境
    if(config.env === 'dev' || config.env === 'local' || config.env === 'development'){
        appenders.out = {
            type: 'console' //设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
        }
    }

    
    const logger = log4js.getLogger('cheese');
    return async(ctx, next) => {
        const start = Date.now() // 记录请求开始时间

        // 循环levels 将所有方法挂载到ctx 上
        levels.map((level, i) => {
            contextLogger[level] = message => {
                //设置每天：以日期为单位,数据文件类型，dateFile   注意设置pattern，alwaysIncludePattern属性
                //文件最大值maxLogSize 单位byte (B->KB->M) backups:备份的文件个数最大值,最新数据覆盖旧数据
                appenders.allLog = { 
                    type: 'dateFile', 
                    filename: `${dir}/${level}/`, 
                    pattern: `-yyyy-MM-dd.log`, 
                    alwaysIncludePattern: true ,
                    keepFileExt: true, 
                    maxLogSize: 10485760, 
                    backups: 3
                } 
                //http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
                appenders.httpLog = {
                    type: "dateFile", filename: `${dir}/httpAccess`, pattern: "-yyyy-MM-dd.log", keepFileExt: true
                }
                // //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
                // appenders.errorLog = {
                //     type: 'file', filename: `${dir}/error` , pattern: "-yyyy-MM-dd.log", level: 'error'
                // }
                // appenders.error = {
                //     type: "file", level: "error", appender: 'errorLog' 
                // }
                let logConfig = {
                    appenders,
                    //不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
                    categories: {
                        default: { 
                            appenders: Object.keys(appenders),  //取上面appenders项
                            level: logLevel 
                        }, //error写入时是经过筛选后留下的
                    }
                }

                log4js.configure(logConfig)
                logger[level](assign(ctx, message, commonInfo))
            }
        })
        ctx.log = contextLogger

        // 记录响应时长
        // const responseTime = Date.now() - start
        // if(ctx.status < 500){
        //     ctx.log.error('error'+ `响应时间为: ${responseTime}`)
        // }else{
        //     ctx.log.info(`响应时间为: ${responseTime}`)
        // }

        // if (ctx.status < 500) {
        //     ctx.status = 500;
        //     ctx.log.error(ctx.message);
        //     ctx.state.logged = true;
        //     ctx.throw(ctx.status, ctx.message);
        // }
        
        
        // const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.log.info(assign(ctx, {
            responseTime: `响应时间为${ms/1000}s`
        }, commonInfo))

    }
}
