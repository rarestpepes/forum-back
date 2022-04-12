const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentFrom:{
        type:Object,
        required:true
    },
    commentOn:{
        type:String,
        required:true,
    },
    timestamp:{
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        require: true,
    },
})


module.exports = mongoose.model('commentModel', commentSchema)