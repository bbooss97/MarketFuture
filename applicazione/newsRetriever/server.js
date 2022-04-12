var express = require('express');
var app = express();
var request= require("request")
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
console.log("server avviato")

// app.get('/news', function (req, res) {
//   //res.send('Hello World!');
//   console.log(req.query)
//   argomento=req.query.argomento
//   articoli=cercaNews(argomento,res)
// });

// app.get('/newsNonFake', function (req, res) {

// });

// function cercaNews(argomento,res) {
//     site3="http://api.mediastack.com/v1/news?keywords="+argomento+"&access_key=61a7781d16ba61e387e61c0c9b8f9418&limit=100&languages=en"
//     site2="https://newsdata.io/api/1/news?apikey=pub_5271f3704b65b2e46fb88994f3dff302d7ad&q="+argomento+"&language=en"
//     site="https://newsapi.org/v2/everything?q="+argomento+"&from=2022-03-07&sortBy=popularity&apiKey=4a8196fdffdd4d9da71801f7291b7d60"
//     request(site3, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         res.send(body)
//     }
//     })
// }
function sendToQueue(msg){
  var amqp = require('amqplib/callback_api');
  amqp.connect('amqp://rabbitmq:5672', function(error0, connection) {
      if (error0) {
          throw error0;
      }
      connection.createChannel(function(error1, channel) {
          if (error1) {
              throw error1;
          }
          var queue = 'news';
          // var msg = 'Hello World!';
          channel.assertQueue(queue, {
              durable: false
          });
          msg=JSON.stringify(msg)
          channel.sendToQueue(queue, Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
      });
      // setTimeout(function() {
      //     connection.close();
      //     process.exit(0);
      // }, 500);
  });
}




app.post('/news', function (req, res) {
  articoli=req.body
  console.log(articoli)
  res.send("ok")
  //madare articoli nella queue
  sendToQueue(articoli)
});
app.listen(3000);





