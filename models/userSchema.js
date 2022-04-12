const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    },
    password:{
        type:String,
        required:true
    },
    commentCounter: {
        type:Number,
        required:true,
        default: 0
    },
    notification: {
        type:Boolean,
        required:true,
        default: true
    },
    createdTimestamp:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model('userModel', userSchema)