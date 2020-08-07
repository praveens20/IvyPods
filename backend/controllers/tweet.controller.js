const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const formidable = require("formidable");
const Tweet = require("../models/tweet");

cloudinary.config({

    cloud_name: "praveens20",
    
    api_key: "989586464548229",
    
    api_secret: "iY1NGgN4cjmZ3yGHX89C3kjiAAY",
    
    });


const addTweet = (req,res) => {
    const form = formidable();
 
    form.parse(req, (err, fields, files) => {
        if(Object.keys(fields).indexOf("caption") == -1){
            res.send("No caption");
        }
        else if(Object.keys(files).length == 0){
            console.log("No file attached");
            const newTweet = new Tweet({
                caption: fields.caption,
                hashtags: fields.caption.match(/#[^\s#]*/gmi)
            });
            newTweet.save()
                .then(tweet => 
                {
                    res.send({"msg":"Tweet Created successfully!"});
                    console.log({"msg":"Tweet Created successfully!"});
                })   
                .catch(err => res.send(err)) 
        }
        else{
            console.log("File attached");

            cloudinary.uploader.upload(files.image.path, (err, result) => {
                if(err){
                    res.send(err);
                }
                else{
                    console.log(result);

                    const newTweet = new Tweet({
                        caption: fields.caption,
                        hashtags: fields.caption.match(/#[^\s#]*/gmi),
                        image: result.url
                    });
                    newTweet.save()
                        .then(tweet => 
                        {
                            res.send({"msg":"Tweet Created successfully!"});
                            console.log({"msg":"Tweet Created successfully!"});
                        })   
                        .catch(err => res.send(err)) 
                }
            })
            
        }

    });
    
       
}
module.exports.addTweet = addTweet;


const searchTag = (req,res) => {
    Tweet.find({hashtags: { "$in" : req.query.str}})
        .then(tweets => {
            if(tweets.length == 0){
                res.send({"msg":"No Matching Tweet with this hashtag"});
            }
            else{
                res.send(tweets);
            }
        })
        .catch(err => res.send(err))
}
module.exports.searchTag = searchTag;


const getAllTweets = (req,res) => {
    Tweet.find({}).sort({_id: -1})
        .then(tweets => {
            if(tweets.length == 0){
                res.send({"msg":"No Tweet available"});
            }
            else{
                res.send(tweets);
            }
        })
        .catch(err => res.send(err))
}
module.exports.getAllTweets = getAllTweets;


const deleteTweet = (req,res) => {
    Tweet.findOneAndDelete({_id: req.query.id})
        .then(res.send({"msg":"Deleted Successfully"}))
        .catch(err => res.send(err))
}
module.exports.deleteTweet = deleteTweet;