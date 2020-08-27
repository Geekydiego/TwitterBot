const Twitter = require('twitter');

const Tweet = new Twitter({
    consumer_key:'---------------------------',  
    consumer_secret:'----------------------------',
    access_token_key:'------------------------------',  
    access_token_secret:'--------------------------------'
})

var params = {
    q: '#Grabr OR #grabr OR #GrabrArgentina OR #grabrArgentina OR @grabrinc',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}
function doCheck() { 
    Tweet.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.statuses.length; i++) {
                let id = { id: tweets.statuses[i].id_str }
                Tweet.post('statuses/retweet', id, function (err, response) {
                    if (err) {
                        console.log(err[0].message);
                    }
                    else {
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
                    }
                });

                Tweet.post('favorites/create', id, function (err, response) {
                    if (err) {
                        console.log(err[0].message);
                    }
                    else {
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        console.log('fav: ', `https://twitter.com/${username}/status/${tweetId}`)
                    }
                });
            }
        } else {
            console.log(error);
        }
    })
}
doCheck();
setInterval(doCheck, 60);
