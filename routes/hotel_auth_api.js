const router = require('express').Router();
const ResturantUser = require('../models/Dominosuser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function verifyUser(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    try{
        const user = await jwt.verify(token,'myappsecret');
        console.log(user);
        if(!user){
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    

    

}

router.get('/user',verifyUser,async (req,res)=>{
    const user = req.user;

    const userData = await ResturantUser.findOne({_id:user._id});
    res.send(userData);
}).
post('/login',async (req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    if(!email || !password){
        return res.status(400).send('Please fill all the fields');
    }

    const user = await ResturantUser.findOne({email});
    if(!user){
        return res.send({message:"Invalid username & Password"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.send({message:"Invalid username & Password"})
    }

    //now make at access token
    const token = jwt.sign({_id:user._id}, 'myappsecret');

    res.send({token});

    

}).
post('/new',async (req,res)=>{
    const {name,email,phone,password} = req.body;
    if(!name || !email || !phone || !password){
        return res.status(400).send('Please fill all the fields');
    }

    const hashed = await bcrypt.hash(password,10);

    //check is already there is a user with same email

    const user = await ResturantUser.findOne({email});
    if(user){
        return res.status(400).send('User already exists');
    }

    new ResturantUser({
        name,
        email,
        phone,
        password:hashed
    }).save().then(()=>{
        res.status(200).send('Account Created for the Resturant!');
    })
})

module.exports = router;