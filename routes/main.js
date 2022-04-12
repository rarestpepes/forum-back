const express = require("express");
const router = express.Router();

const userMiddle = require("../middleware/userMiddleware")

const {login, register, logout, getProfile, changeImg} = require("../controllers/userControllers")
const {postForum, getAllForums, getSingleForum, comment, getFavoriteForums} = require("../controllers/forumControllers")


router.post("/login", userMiddle.validateLogin, login);
router.post("/register", userMiddle.validateRegistration, register);
router.get("/logout", logout);

router.post("/postForum", postForum);
router.get("/getAllForums/:page", getAllForums);
router.get("/getsingleforum/:id", getSingleForum);

router.post("/comment", comment)

router.get("/userprofile", getProfile)
router.post("/changeimg", changeImg)

router.post("/getFavoriteForums", getFavoriteForums);

module.exports = router;
