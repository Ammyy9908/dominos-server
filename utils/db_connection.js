const mongoose = require('mongoose');

const makeConnection = async ()=>{
    try{
        const connection = await mongoose.connect('mongodb+srv://Sumit:2146255sb8@cluster0.0wij2.mongodb.net/domios', {useNewUrlParser: true, useUnifiedTopology: true});
        return connection;
    }
    catch(err){
        return err;
    }
}

module.exports = makeConnection;