
import path from 'path'

const port = process.env.NODE_ENV === 'production' ? '80' : '3001'

const log = {
    logLevel: 'debug', //指定记录的日志级别
    dir: path.resolve(__dirname, '../../logs'), // 指定日志存放的目录名
    projectName: 'blog', // 项目名，记录在日志中的项目信息
    ip: '0.0.0.0'  // 默认情况下服务器IP地址
}
const auth = {
    admin_secret: 'admin-token',
    tokenKey: 'Token-Auth',
    whiteList: ['login', 'client_api'],
    blackList: ['admin-api']
}

export default {
    port,
    log,
    auth,
    mongodb: {
        username: 'admin',
        pwd: 123456,
        db: 'blog',
        address: 'localhost:27017'
    }
}