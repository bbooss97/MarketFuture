const { time } = require('console');
var mysql = require('mysql');

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
      console.log("Result: " + result);
    });
}

esegui("create table tabella(nome text);")
esegui("insert into tabella(nome)values('rewqrew');")



  