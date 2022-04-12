const bcrypt = require('bcrypt');
const userDb = require('../models/userSchema');
const forumDB = require('../models/forumSchema')
const commentDB = require('../models/commentSchema')
const notificationDB = require('../models/notificationSchema')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body

        const hashedPass = await bcrypt.hash(password, 10)

        const user = new userDb()

        user.username = username
        user.password = hashedPass
        user.createdTimestamp = Date.now()
        await user.save()

        res.send({success: true})
    },
    login: async (req, res) => {
        const {username} = req.body

        const user = await userDb.findOne({username})

        req.session.username = username

        const userObj = {
            username: user.username,
            profileImage: user.profileImage,
            notifyOnNewComment: user.notifyOnNewComment,
            commentCounter: user.commentCounter,
            notifications: user.notifications,
            createdTimestamp: user.createdTimestamp
        }
        res.send({success: true, userObj})
    },
    logout: (req,res) => {
        req.session.username = null;
        res.send({ success: true });
    },
    getProfile: async (req, res) => {
        const username = req.session.username

        const user = await userDb.findOne({username})
        const userForums = await forumDB.find({author: username})
        const notifications = await notificationDB.find({forumAuthor: username})

        res.send({success:true, user, userForums, notifications})
    },
    changeImg: async (req, res) => {
        const {username} = req.session
        const {profileImage} = req.body

        const user = await userDb.findOneAndUpdate({username}, {$set: {profileImage: profileImage}} )

        res.send({success:true, user})
    }
};
