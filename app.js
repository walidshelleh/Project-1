const express=require('express');
const app=express();
app.set('view engine','ejs');
app.set('views','views');
const mongoose= require('mongoose');
const bodyParser=require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
const expressSession=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(expressSession);
const mdbsession = MongoDBSession({uri:"mongodb://localhost:27017/shop",collection:'sessions'})
app.use(expressSession({secret:'Motaz',resave:false,saveUninitialized:false,store:mdbsession}));
const shopRouter = require('./routes/shop');
app.use(shopRouter);
const adminRoutes=require('./routes/admin');
app.use('/admin',adminRoutes);
const authRoutes=require('./routes/auth');
app.use(authRoutes);
const errorController=require('./controllers/errors');
app.use(errorController.get404);
mongoose.connect("mongodb://localhost:27017/testshop")
.then(() => {
    console.log("Connected successfully to the 'testshop' database on localhost");
})
.catch((error) => {
    console.error("Failed to connect to the 'testshop' database:", error.message);
});


app.listen(8080);