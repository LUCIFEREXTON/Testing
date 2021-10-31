const { User, Msg } = require("./db")
exports.login = async(req, res) => {
    try {
        const foundUser = await User.findOne({ name: req.body.name, passcode: req.body.passcode });
        if (!foundUser) {
            const user = await new User({...req.body }).save();
            return res.cookie('token', user._id).json({
                login: true,
                user: {
                    id: user._id,
                    name: user.name
                }
            })
        }
        return res.cookie('token', `${foundUser._id}`).json({
            login: true,
            user: {
                id: foundUser._id,
                name: foundUser.name
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getuser = async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id })
    return res.json({
        user: {
            id: await user._id,
            name: await user.name
        }
    });
}