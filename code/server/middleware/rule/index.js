import path from 'path'
import fs from 'fs'
import blogContent from  '../../controller/client'

export default opts => {
    let { app, rules = []} = opts
    // console.log(app)
    rules.map((item, index)=>{
        let content = {}
        content['blog'] = blogContent
        content.filename = item.name
        app[item.name] = content
    })
    
    
   
}