const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentFrom:{
        type:String,
        required:true
    },
    commentTo:{
        type:String,
        required:true,
    },
    timestamp:{
        type: Number,
        required: true,
        default: Date.now(),
    },
    comment: {
        type: String,
        require: true,
    },
})


module.exports = mongoose.model('commentModel', commentSchema)