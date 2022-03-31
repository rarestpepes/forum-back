const bcrypt = require('bcrypt');
const userSchema = require('../models/userSchema')
const userDB = require('../models/userSchema')

module.exports = {
    validateRegistration: async (req, res, next) => {
        const { password, pass2, username } = req.body;
        if (password.length < 5) return res.send({ success: false, message: 'Password to short' });
        if (password.length > 50) return res.send({ success: false, message: 'Password to long' });
        if (password !== pass2) return res.send({ success: false, message: 'Passwords do not match' });
        if (await userDB.findOne({ username })) return res.send({success: false, message: 'User with this email already exists',});
        next();
    },
    validateLogin : async (req, res, next) => {
        const {username, password} = req.body

        const userExists = await userDB.findOne({username})
        if (!userExists) return res.send({success: false, message: "Bad credentials"})

        const passMatch = await bcrypt.compare(password, userExists.password)
        if (!passMatch) return res.send({success: false, message: "Bad credentials"})
        next()
    }
/*
    validateIsUserLoggedIn: async (req, res, next) => {
        const { email } = req.session;
        if (!email) return res.send({ success: false, message: 'Vartotojas neprisijungęs' });
        const user = await userSchema.findOne({ email: email.toLowerCase() });
        if (!user) return res.send({ success: false, message: 'Vartotojas neegzistuoja' });
        next();
    },
*/
};