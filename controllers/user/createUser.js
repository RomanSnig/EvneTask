const{hashPassword} = require('../../helpers/passwordHasher');
const User = require('../../models/User');

module.exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        let {name, password, email} = req.body;
        if (!name || !password || !email) throw new Error('Some field is empty');
        const isPresent = await User.findOne({
                email: email,
                // password: password

        });
        if(isPresent) throw new Error('You are already registered');

        const hashedPass = await hashPassword(password);

        const insertedUser = await User.create({
            name,
            email,
            password: hashedPass,
        });

        res.json({
            success: true,
            msg: insertedUser
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
