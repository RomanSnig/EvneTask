// const db = require('../../dataBase').getInstance();
const User = require('../../models/User');
const tokenizer = require('../../helpers/tokinazer');
const {checkHashPassword} = require('../../helpers/passwordHasher');

module.exports.authUser = async (req, res) =>{
    try {
        const {email = '', password = ''} = req.body;
        console.log(req.body);
        if (!email || !password) {
            throw new Error('Some field is empty')
        }
        const isPresent = await User.findOne({
                email: email,
                // password: password

        });
        if (!isPresent) throw new Error('You are not register');

        const {id, name, password: hashPassword} = isPresent;

        const isPassOK = await checkHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');

        const token = tokenizer({id, name});
        res.json({
            access: true,
            msg: token,
            user: isPresent
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            access: false,
            msg:e.message
        })
    }
};
