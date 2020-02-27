
import Koa from 'koa'
import ip from 'ip'

import config from './config'
import router from './router'
import middleware from './middleware'
import './mongodb' 

const app = new Koa()
middleware(app)
router(app)

app.listen(config.port,'0.0.0.0', () => {
    console.log(`server is running at: http://${ip.address()}:${config.port}`)
})

