var express = require('express');
var app = express();
var fs=require('fs');
var request= require("request")
var bodyParser = require('body-parser')
const session = require('express-session');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({
  secret: 'token segreto',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  // store: store,
  name: 'logged',
  genid: (req) => {
      // Restituire un ID identificativo casuale per la sessione
  }
}));

var mysql = require('mysql');

const Mysql = require('sync-mysql') 


const connection = new Mysql({ 
  host: "sql-db-1",
  database: "mysql",
  port: "3306",
  user: "root",
  password: "example"
}) 
  

function esegui2(sql) {
  var result = connection.query(sql) 
  return result
}


var con = mysql.createConnection({
  host: "sql-db-1",
  database: "mysql",
  port: "3306",
  user: "root",
  password: "example"
});
a=1


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

function esegui(sql){
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
}
esegui("create table if not exists users(username text,email text,password text);")


// app.get("*",function (req, res) {
//     url=req.url
//     console.log(url)
//     if(url=="/"){
//         res.sendFile(__dirname+"/index.html")
//         return;
//     }
//     res.sendFile(__dirname+url)
// })

app.get("/",function (req, res) {
//res.sendFile(__dirname+"/index.html")
  if(!req.session.user) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname+"/index.html")
  }
})

app.get("/getNews",function (req, res) {
  ris=esegui2("select * from news")
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ris));
})
  





app.get("/predictor",function (req, res) {
  //res.sendFile(__dirname+"/index.html")
    if(!req.session.user) {
      res.redirect('/login');
    } else {
      res.sendFile(__dirname+"/predictor.html")
  }
  })
  



app.get("/index.js",function (req, res) {
  res.sendFile(__dirname+"/index.js")
})
app.get("/blog.css",function (req, res) {
  res.sendFile(__dirname+"/index.js")
})


app.post('/register', async (req, res) => {

  //esegui("inserisci in tabeella users")
  
});

app.post('/login', async (req, res) => {
  try {
      let user = await db.users.findOne({email: req.body.email});
      if(user !== null) {
          req.session.user = {
                email: user.email,
                name: user.name
          };
          res.redirect('/');
      } else {
         // Login non valido
      }
  } catch(err) {
      res.sendStatus(500);
  }
});

app.get('/logout', (req, res) => {
  if(req.session.user) {
      delete req.session.user;
      res.redirect('/login');
  } else {
      res.redirect('/');
  }        
});

app.listen(3000);





