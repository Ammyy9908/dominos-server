const {model,Schema} = require('mongoose');


const restunatSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:Object,
        required:true
    },
    menu:{
        type:Array,
        default:[]
    },
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:Array,
        default:[]
    },
    workingHours:{
        type:Object,
        required:true
    },
    admin:{
        type:Array,
        required:true
    },
    orders:{
        type:Array,
        default:[]
    },
    workers:{
        type:Array,
        default:[]
    }

})

const Resturant = model('Resturant',restunatSchema);

module.exports = Resturant;