const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const SECREC_KEY = require('./router/auth_users.js').SECREC_KEY;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    // write auth logic with express-session from the request object
    if(req.session.authorization){
        let token = req.session.authorization.accessToken;
        jwt.verify(token, SECREC_KEY, {expiresIn: 60 * 60}, (err, decoded)=>{
            if (!err){
                req.session.authorization = decoded;
                next();
            }else{
                res.status(401).send("Unauthorized");
            }
        });
    } else{
        res.status(401).send("Unauthorized");
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
