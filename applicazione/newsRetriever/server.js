var express = require('express');
var app = express();
var request= require("request")

app.get('/news', function (req, res) {
  //res.send('Hello World!');
  console.log(req.query)
  argomento=req.query.argomento
  articoli=cercaNews(argomento,res)
});

app.get('/newsNonFake', function (req, res) {

});

function cercaNews(argomento,res) {
    site3="http://api.mediastack.com/v1/news?keywords="+argomento+"&access_key=61a7781d16ba61e387e61c0c9b8f9418&limit=100&languages=en"
    site2="https://newsdata.io/api/1/news?apikey=pub_5271f3704b65b2e46fb88994f3dff302d7ad&q="+argomento+"&language=en"
    site="https://newsapi.org/v2/everything?q="+argomento+"&from=2022-03-07&sortBy=popularity&apiKey=4a8196fdffdd4d9da71801f7291b7d60"
    request(site3, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body)
    }
    })
}
app.listen(3000);