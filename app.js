const express=require("express");
const router=require("./src/routes/api.js");
const app=new express();
const bodyParser=require("body-parser");



//Security middlewares import
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const mongoSanitize=require("express-mongo-sanitize");
const xss=require("xss-clean");
const hpp=require("hpp");
const cors=require("cors");


//Database
const mongoose=require("mongoose");


//Security middleware implement
app.use(cors());
app.use(helmet());
// app.use(mongoSanitize({ replaceWith: '_' }));
// app.use(xss());
app.use(hpp());


//bodyParser implement
app.use(bodyParser.json());


//Request rate limit
const limiter=rateLimit({windowMs:15*60*1000,max:1000});
app.use(limiter);


//mongodb connection

mongoose.connect("mongodb://127.0.0.1:27017/Todo")
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Connection Error:", err);
});



//Routing Implement
app.use("/api/v1",router);


//undefined routing implement
app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports=app;