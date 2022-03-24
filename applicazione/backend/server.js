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
  cookie: {}

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
  //console.log(req.session.user)
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
  res.sendFile(__dirname+"/blog.css")
})
app.get("/login",function (req, res) {
  res.sendFile(__dirname+"/login.html")
})
app.get("/login.css",function (req, res) {
  res.sendFile(__dirname+"/login.css")
})


app.post('/registrami', async (req, res) => {
  dati=req.body
  username=dati["username"]
  email=dati["email"]
  password=dati["password"]
  
  //esegui("inserisci in tabeella users")
  query="insert into users(username,email,password) values('"+username+"','"+email+"','"+password+"')"
  risultati=esegui2(query)
  res.redirect('/login')
});

app.post('/loggami', async (req, res) => {
  try {
      //let user = await db.users.findOne({email: req.body.email});
      //user=esegui2("select")
      dati=req.body
      email=dati["email"]
      password=dati["password"]
      query="select username,email from users where email='"+email+"' and password='"+password+"'"
      risultati=esegui2(query)
      //console.log(risultati)
      
      if(risultati.length > 0) {
        
          req.session.user = {
                email: risultati[0].email,
                name: risultati[0].username
          };
          
          res.redirect('/');
      } else {
        res.redirect("/login")
         // Login non valido
      }
  } catch(err) {
      res.sendStatus(500);
  }
});

app.get('/sloggami', (req, res) => {
  if(req.session.user) {
      delete req.session.user;
      res.redirect('/login');
  } else {
      res.redirect('/login');
  }        
});

app.listen(3001);





