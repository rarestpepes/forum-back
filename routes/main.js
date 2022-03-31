const express = require("express");
const router = express.Router();

const middle = require("../middleware/main")
const {login, register} = require("../controllers/userControllers")

router.post("/login", middle.validateLogin, login);
router.post("/register", middle.validateRegistration, register);


module.exports = router;
