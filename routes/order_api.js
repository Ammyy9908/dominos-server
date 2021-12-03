const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Orders');
const dotenv = require('dotenv');
dotenv.config();
async function verifyUser(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    try{
        const user = await jwt.verify(token, process.env.SECRET);
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

router.get('/user/orders', verifyUser,async (req, res) => {

    const user = req.user;

    const orders = await Order.find({userId: user._id});

    res.status(200).json({orders})

}).get('/user/orders/:id', verifyUser, async (req, res) => {
    const user = req.user;
    const order = await Order.findOne({userId: user._id, _id: req.params.id});
    if(!order){
        return res.status(404).json({message: 'Order not found'});
    }

    res.status(200).json({order});
}).
post('/user/:uid/order/new',async (req, res) => {
    const user = req.user;
    const {items,price} = req.body;
    const order = new Order({
        userId: user._id,
        items: items,
        price: price,
    });
    await order.save();
    res.status(201).json({order});
}).
put('/user/orders/:id', verifyUser, async (req, res) => {
    const user = req.user;
    const order = await Order.findOne({userId: user._id, _id: req.params.id});
    if(!order){
        return res.status(404).json({message: 'Order not found'});
    }
    order.status = req.body.status;
    await order.save();
    res.status(200).json({order});
});

module.exports = router;