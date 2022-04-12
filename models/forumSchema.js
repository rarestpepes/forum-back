const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    theme:{
        type:String,
        required:true,
    },
    timestamp:{
        type: Number,
        required: true,
    },
    commentsCount: {
        type: Number,
        require: true,
    },
})


module.exports = mongoose.model('forumModel', forumSchema)