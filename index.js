const express = require('express');
const app = express();
const makeConnection = require('./utils/db_connection');
const env = require('dotenv');
const cors = require('cors');
const auth_api = require('./routes/auth_api');
const order_api = require('./routes/order_api');
const resturant_user_api = require('./routes/hotel_auth_api');
env.config();
app.get('/',(req,res)=>res.send('Dominos API Working'))
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use('/api/auth',auth_api);
app.use('/api/order',order_api);
app.use('/api/resturant/auth',resturant_user_api)
makeConnection().then(()=>{console.log('Database connected')}).catch((err)=>{console.log(err)})
app.listen(process.env.PORT || 5000,()=>console.log('Server started at port 5000'))