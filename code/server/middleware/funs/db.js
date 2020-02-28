/*!
* 通用数据库方法   数据库增删改查统一管理入口
*/

/**
 * 公共findOne方法 非关联查找  根据conditions 的条件进行检索
 * @param {object} model - 数据模型库
 * @param {string} conditions  -  搜索条件
 * @param {string} fields  -  查找是限定的条件，如顺序、某些字段不查找等
 * @param {string} options  
 */ 
export const findOne = (model, conditions, fields, options = {}) => {
    let sort = options.sort == undefined ? {
        _id: -1
    } : options.sort
    delete options.sort

    return  new Promise((resolve, reject)=> {
        model.findOne(conditions, fields, options)
        .sort(sort)
        .exec((err, res)=>{
            if(err){
                console.error('Error: ' + JSON.stringify(err))
                reject(err)
                return
            }else{
                if(res) {
                    console.log('find success!')
                    
                }else{
                    console.log('find fail: no data!')
                }
                resolve(res)
            }
        })
    })
}

/**
 * 公共findById方法 根据id 返回文档
 * @param {object} model - 数据模型库
 * @param {string} id  -  查询文档ID
 */ 
export const findById = (model, id) => {
    return  new Promise((resolve, reject)=> {
        model.findById(id)
        .sort()
        .exec((err, res)=>{
            if(err){
                console.error('Error: ' + JSON.stringify(err))
                reject(err)
                return
            }else{
                if(res) {
                    console.log('find success!')
                    
                }else{
                    console.log('find fail: no data!')
                }
                resolve(res)
            }
        })
    })
}

/**
 * 公共find方法 根据条件 返回多个文档
 * @param {object} model - 数据模型库
 * @param {string} conditions  -  搜索条件
 * @param {string} fields  -  查找是限定的条件，如顺序、某些字段不查找等
 * @param {string} options  
 */ 
export const find = (model, conditions, fields, options = {}) => {
    let sort = options.sort == undefined ? {
        _id: -1
    } : options.sort
    delete options.sort

    return  new Promise((resolve, reject)=> {
        model.find(conditions, fields, options)
        .sort(sort)
        .exec((err, res)=>{
            if(err){
                console.error('Error: ' + JSON.stringify(err))
                reject(err)
                return
            }else{
                if(res) {
                    console.log('find success!')
                    
                }else{
                    console.log('find fail: no data!')
                }
                resolve(res)
            }
        })
    })
}