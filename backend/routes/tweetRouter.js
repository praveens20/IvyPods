const express = require('express');
const router = express.Router();

const tweet = require('../controllers/tweet.controller');

router.post('/saveTweet',                   tweet.addTweet);
router.get('/tweets',                       tweet.getAllTweets);
router.get('/tweetsbyTag',                  tweet.searchTag);
router.delete('/tweet',                     tweet.deleteTweet);

module.exports = router;