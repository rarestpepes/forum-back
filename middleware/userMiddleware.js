const bcrypt = require('bcrypt');
const userSchema = require('../models/userSchema')
const userDB = require('../models/userSchema')

module.exports = {
    validateRegistrationData: async (req, res, next) => {
        const { password_one, password_two, email, number } = req.body;
        if (password_one.length < 5) return res.send({ success: false, message: 'Password to short' });
        if (password_one.length > 50) return res.send({ success: false, message: 'Password to long' });
        if (password_one !== password_two)
            return res.send({ success: false, message: 'Passwords do not match' });
        if (await userSchema.findOne({ email })) {
            return res.send({
                error: true,
                message: 'User with this email already exists',
            });
        } else {
            await phoneDb.findOneAndDelete({ number: number });
        }
        if (await userSchema.findOne({ phoneNumber: number }))
            return res.send({ error: true, message: 'Toks numeris jau naudojamas.' });
        next();
    },
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