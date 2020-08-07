//importing the required modules or libraries
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const cors = require("cors");

const app = express();

const port = process.env.port || 3000;  

const url = "mongodb+srv://praveen:praveens20@myatlascluster.w17b6.mongodb.net/Tweeter";

const tweetRouter = require("./routes/tweetRouter");

//setting up the node app
app.listen(port, (err) => {
    if(err)
    {
        throw err;
    }
    console.log("app is started at localhost:" +port);
})

//setting up the connection between node and mongodb
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(console.log("mongodb is connected successfully"))
    .catch(err => console.log(err))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));
app.use(cors()); 
app.use(express.static('public'));

app.use('/',tweetRouter);

exports.module = app;