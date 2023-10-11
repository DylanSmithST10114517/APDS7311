const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../models/user');
const {hashPassword,isValidPassword} = require('../utils/hash');

//POST - Register new user
router.post('/register',async (req,res) => {
    try
    {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();

    }
    catch(err)
    {
        return res.status(500).json(err)
    }
    res.sendStatus(201);
});

//POST - Login user
router.post('/login',async (req,res) =>
{
    const{error} = validateUser(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user)
    return res.status(400).json({error: 'Incorrect username or password'});

    const valid = await isValidPassword(req.body.password,user.password);

    if(!valid)
    return res.status(400).json({error: 'Incorrect username or password'});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.send({token});
});


module.exports = router;