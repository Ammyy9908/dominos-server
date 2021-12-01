const {model,Schema} = require('mongoose');

// explanation of Auth Flow
// now if user send this jwt token back to the server
// server provide his/her user profile inside the applcation
const user_schema = new Schema({

    name:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    cart:{
        type:Array,
        default:[]
    },
    addresses:{
        type:Array,
        default:[]
    }

})

const User = model('User',user_schema);

module.exports = User;