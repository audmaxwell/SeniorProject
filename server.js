const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'SelectPink',
  database: 'newDB'
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'build')));
app.post('/registration/create', (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;
  var sql = `INSERT INTO users (
    email,username, password)
    VALUES(
    ?, ?, ?)`;
  conn.query(sql, [email, username, password], function (err, data) {
    if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
//  conn.query(sql, userDetails,function (err, data) { 
 //     if (err) throw err;
 //        console.log("User data is inserted successfully "); 
//  });
// res.redirect('/users/form')

})

app.get('/ping', function (req, res) {
 return res.json('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);