var amqp = require('amqplib/callback_api');
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
esegui("create table if not exists news(title text,description text,image text,url text);")



amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'news';
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            //console.log(" [x] Received %s", msg.content.toString());
            esegui("delete from news;");
            msg=msg.content.toString();
            msg=JSON.parse(msg)
            articoli=msg["articoli"]
            console.log(articoli)
            for (var i=0;i<articoli.length;i++) {
                title=articoli[i]["title"]
                description=articoli[i]["description"]
                image=articoli[i]["image"]
                url=articoli[i]["url"]

                title=title.replace("'","''")
                description=description.replace("'","''")
                if (image!=null){
                    image=image.replace("'","''")
                }
                url=url.replace("'","''")
                esegui("insert into news (title,description,image,url) values ('"+title+"','"+description+"','"+image+"','"+url+"');")
            }
        }, {
            noAck: true
        });
    });
});