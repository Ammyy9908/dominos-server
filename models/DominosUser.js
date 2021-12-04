const {model,Schema} = require('mongoose');


const hotel_user_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

const ResturantUser = model('ResturantUser',hotel_user_schema);

module.exports = ResturantUser;