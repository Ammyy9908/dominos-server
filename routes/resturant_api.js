const router = require('express').Router();
const Restaurant = require('../models/restaurant');

router.
post('/admin/create',async (req, res) => {
    const {resturant_id} = req.body;
    
}).
get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).send('The restaurant with the given ID was not found.');
    res.send(restaurant);

}).post('/new',async (req,res)=>{
    const {name,location,workingHours} = req.body;

    const restaurant = new Restaurant({name,location,workingHours,admin});
    restaurant.save().then(()=>{
        res.status(201).send({message:"Resturant is Created!"});
    });
});