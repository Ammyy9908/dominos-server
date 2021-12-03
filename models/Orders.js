const {model,Schema} = require('mongoose');

const order_schema = new Schema({
    userId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:'processing'
        // is Out for delivery, Delivered, Cancelled
    }
},{
    timestamps:true
});

const Order = model('Order',order_schema);

module.exports = Order;