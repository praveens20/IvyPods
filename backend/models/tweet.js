const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    caption:{
        type: String,
        required:'Please enter caption',
        maxlength: 150
    },
    image:{
        type: String
    },
    hashtags: {
        type: Array
    }
}, { versionKey : false });

const Tweet = mongoose.model('tweet',tweetSchema);

module.exports = Tweet;