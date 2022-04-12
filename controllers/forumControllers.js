const userDb = require('../models/userSchema');
const forumDB = require('../models/forumSchema')
const commentDB = require('../models/commentSchema')
const notificationDB = require('../models/notificationSchema')


module.exports = {
    postForum: async (req, res) => {
        const {username} = req.session
        const {newForumTheme} = req.body

        const forum = new forumDB();

        forum.author = username
        forum.theme = newForumTheme
        forum.commentsCount = 0
        forum.timestamp = Date.now()
        await forum.save()

        res.send({success:true, forum})
    },

    getAllForums: async (req, res) => {
        const {page} = req.params

        let pageNum = Number(page) * 10 - 10

        const forums = await forumDB.find({}).sort({timestamp: -1}).skip(pageNum).limit(10)
        let forumCount = await forumDB.count()

        res.send({success:true, allForums: forums, forumCount})
    },

    getSingleForum: async (req, res) => {
        const {id} = req.params

        const forum = await forumDB.findOne({_id: id})
        const author = await userDb.findOne({username: forum.author})
        const comments = await commentDB.find({commentOn: id})

        return res.send({success:true, forum, comments, author})
    },
    comment: async (req, res) => {
        const {commentFrom, commentOn, comment} = req.body

        const commenter = await userDb.findOne({username: commentFrom})
        const forum = await forumDB.findOne({_id: commentOn})
        const author = await userDb.findOne({username: forum.author})

        const notification = new notificationDB()
        const commentNew = new commentDB()

        let ytReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        let imgReg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/

        let varComment = comment.replace(/(https?:\/\/[^\s]+)/g, (match) => {
            if (ytReg.test(match)) {
                let ytID = match.match(ytReg)
                return `<iframe width="420" height="315" src="https://www.youtube.com/embed/${ytID[1]}" allowfullscreen></iframe>`
            }
            if (imgReg.test(match)) {
                let imgURL = match.match(imgReg).input
                return `<img height="315" src="${imgURL}" alt=""/>`
            } else {
                return `<a href="${match}" target="_blank"></a> `
            }
        })

        forum.commentsCount++
        await forum.save()

        commenter.commentCounter++
        await commenter.save()

        if (commenter.username !== forum.author) {
            author.notification = true
            await author.save()
        }



        if (forum.author !== commenter.username) {
            notification.forumAuthor = author.username
            notification.forumID = forum._id
            notification.forumTitle = forum.theme
            notification.commentAuthor = commenter.username
            await notification.save()
        }


        commentNew.commentFrom = commenter
        commentNew.commentOn = commentOn
        commentNew.comment = varComment
        commentNew.timestamp = Date.now()
        await commentNew.save()

        res.send({success:true, commentNew})
    },
    getFavoriteForums: async (req, res) => {
        const { favoriteArray } = req.body;
        const forums = await forumDB.find({ _id: favoriteArray });
        res.send({ success: true, getFavoriteForums: forums });
    },
};
