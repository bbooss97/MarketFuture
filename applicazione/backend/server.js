var express = require('express');
var app = express();
var fs=require('fs');
var request= require("request")
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.get('/news', function (req, res) {
//   //res.send('Hello World!');
//   console.log(req.query)
//   argomento=req.query.argomento
//   articoli=cercaNews(argomento,res)
// });

// app.get('/newsNonFake', function (req, res) {


app.get("*",function (req, res) {
    url=req.url
    console.log(url)
    if(url=="/"){
        res.sendFile(__dirname+"/index.html")
        return;
    }
    res.sendFile(__dirname+url)
})
// app.get("/script.js")

// app.post('/news', function (req, res) {
//   articoli=req.body
//   console.log(articoli)
//   res.send("ok")
//   //madare articoli nella queue
//   sendToQueue(articoli)
// });
app.listen(3000);





