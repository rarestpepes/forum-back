const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    forumAuthor:{
        type:String,
        required:true
    },
    forumID:{
        type:String,
        required:true,
    },
    forumTitle:{
        type:String,
        required:true
    },
    commentAuthor: {
        type:String,
        required:true,
    }
})


module.exports = mongoose.model('notificationModel', notificationSchema)