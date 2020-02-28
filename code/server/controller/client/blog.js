import blogModel from  '../../model/blog'

const name = new blogModel()

// // 保存数据
// name.save(()=>{
//     name.speak()
//     
// })

// name.speak();

module.exports = {
    async info(ctx, next){
        console.log('----------------获取博客信息 blog/info-----------------------');
        let id = ctx.request.query.id || '5e54cea7e98ec00bd198e5e7';
        // console.log('请求返回status',ctx.response.status)
        try {
            let data = await ctx.findById(blogModel, id)
            
            ctx.send(data, 'success');
            await next()
            // data.then(() => {
            //     return data
            // })
            // await next()
            // return data
            
        } catch (e) {
            return ctx.sendError(e,'error')
        }
    }
}
