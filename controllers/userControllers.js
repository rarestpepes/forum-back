const bcrypt = require('bcrypt');
const userDb = require('../models/userSchema');
const forumDB = require('../models/forumSchema')
const commentDB = require('../models/commentSchema')


module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body

        const hashedPass = await bcrypt.hash(password, 10)

        const user = new userDb()

        user.username = username
        user.password = hashedPass
        await user.save()

        res.send({success: true})
    },
    login: async (req, res) => {
        const {username} = req.body

        const user = await userDb.findOne({username})

        req.session.username = username

        const userForums = await forumDB.find({username})

        const userObj = {
            username: user.username,
            profileImage: user.profileImage,
            userForums: userForums,
            notifyOnNewComment: user.notifyOnNewComment
        }

        res.send({success: true, userObj})
    },
};
