import db from '../mongodb'

let blogSchema = db.Schema({
    type: Array,
    title: String,
    desc: String,
    html: String,
    isVisible: Boolean,
    releaseTime: Date,
    createTime: {type: Date, default: Date.now()}
})

blogSchema.methods.speak = function(){
    let greeting = this.name ? this.name : 'none'
    console.log(greeting)
}

let blogModel = db.model('blog', blogSchema)
export default blogModel