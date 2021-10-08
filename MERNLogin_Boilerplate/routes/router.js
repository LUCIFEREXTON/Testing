const express = require('express')
const router = express.Router()
const User = require('../userSchema')
const { hash, compare } = require('bcrypt')
router.get('/', (req, res) => {
    res.end('Hello');
})

router.post('/register', async(req, res) => {
    console.log('In register');
    const { email } = req.body;
    let { password } = req.body;
    try {
        const olduser = await User.findOne({ email });
        if (olduser) {
            return res.json({ msg: 'Email already registered', status: 404 });
        }
        const hashedpassword = await hash(password, 8);
        password = hashedpassword;
        const newUser = new User({ email, password });
        const saveduser = await newUser.save()
        if (saveduser) {
            return res.json({ msg: 'Email registered, You can Login Now', status: 200 });
        }
        return res.json({ msg: 'Sorry somehting went wrong', status: 404 });
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Sorry somehting went wrong', status: 404 });
    }

})
router.post('/login', async(req, res) => {
    console.log('In Login');
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            const match = await compare(password, foundUser.password);
            if (match) {
                return res.json({ msg: 'Your Are Logged In', status: 200 });
            }
            return res.json({ msg: 'this Password-Email combination not found', status: 404 });
        }
        return res.json({ msg: 'User with this email not found', status: 404 });
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'Sorry somehting went wrong', status: 404 });
    }
})

module.exports = router;