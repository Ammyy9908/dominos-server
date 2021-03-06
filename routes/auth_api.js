const router = require('express').Router();
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/User');
env.config();
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

// user exist in db with this google accounts
    
    
    router.get('/user',verifyUser,async (req,res)=>{

        const user = req.user;
        const userData = await User.findOne({_id:user._id});
        res.status(200).json(userData);

})
.post('/new',async (req,res)=>{
    
    const {email,name,googleId,imageUrl} = req.body;
    const user = await User.findOne({googleId:googleId});
    if(user){
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        return res.status(200).json({
            message: 'User already exists',
            token:token
        });
    }
    const newUser = new User({email,name,googleId,avatar:imageUrl});
    newUser.save().then((user)=>{
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        res.status(200).json({
            message: 'User created',
            token:token
        });
    });
})
.post('/address/add',verifyUser,async (req,res)=>{
    const {address} = req.body;
    const user = req.user;
    const userData = await User.findOne({_id:user._id});
    const newAddress = [...userData.addresses,address];
    User.findOneAndUpdate({_id:user._id},{addresses:newAddress}).then((user)=>{
        res.status(200).json({
            message:'address added'
        });
    }).catch((err)=>res.send({error:err}));
}).put('/user/update',verifyUser,async (req,res)=>{
    
    const {name,email,avatar} = req.body;
    const user = await User.findOne({_id:req.user._id});
    if(!user){
        return res.status(404).json({
            message:"Wrong user id"
        });
    }

    User.updateOne({googleId:user.googleId},{name,email,avatar}).then(()=>{
        User.findOne({googleId:user.googleId}).then((user)=>{
            res.status(200).json({
                message:'User updated',
                user:user
            });
        })
    });
})
.put('/user/favourites/add',verifyUser,async (req,res)=>{
    const user = req.user;

    const {item} = req.body;

    const userData = await User.findOne({_id:user._id});

    const oldFavourites = userData.favourites;

    const newFavourites = [...oldFavourites,item];

    User.updateOne({_id:user._id},{favourites:newFavourites})
    .then(()=>{
        res.status(200).send({message:"Item Added to Favourites!"});
    }).catch((e)=>{
        res.status(500).send({error:"Problem while adding to favourites!"});
    })
})
.delete('/user/favourite/delete/:id',verifyUser,async (req,res)=>{
    const user = req.user;
    const {id} = req.params;
    console.log(id);
    const userData = await User.findOne({_id:user._id});
    const oldFavourites = userData.favourites;
    const index = oldFavourites.findIndex(
        (favouriteItem) => favouriteItem.id === +id
      );
      

      let newFavourite = [...oldFavourites];
      if(index>=0){
          
        newFavourite.splice(index, 1);
      }


      User.updateOne({_id:user._id},{favourites:newFavourite})
      .then(()=>{
          res.status(200).send({message:"Item Deleted from Favourites!"});
      }).catch((e)=>{
            res.status(500).send({error:"Problem while deleting from favourites!"});
      })

    
}
)
.get('/user/favourite/fetch',verifyUser,async (req,res)=>{

    const user = req.user;

    const userData = await User.findOne({_id:user._id});

    res.status(200).send({favourites:userData.favourites});
})

module.exports = router;