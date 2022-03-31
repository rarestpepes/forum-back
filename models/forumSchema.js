const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forumSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    timestamp:{
        type: Number,
        required: true,
        default: Date.now(),
    },
    commentsCount: {
        type: Number,
        require: true,
    },
    comments:{
        type:Array,
        required:false,
    },
})


module.exports = mongoose.model('forumModel', forumSchema)