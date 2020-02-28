import * as clientIp from './get_client_ip'
import * as db from './db'

export default () =>{
    return async(ctx, next) => {
        console.log('拦截con2')
        const func = Object.assign({}, clientIp, db)
        for(let v in func){
            if(func.hasOwnProperty(v)) ctx[v] = func[v]
        }
        await next()
    }
}