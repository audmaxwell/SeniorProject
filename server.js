const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'SelectPink',
  database: 'firstDB'
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
app.use(express.static(path.join(__dirname, 'build')));
app.post('/create-user', (req, res) => {
  const userDetails=req.body;
  var sql = 'INSERT INTO user SET ?';
  console.log(userDetails)
  conn.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
// res.redirect('/users/form')

})

app.get('/ping', function (req, res) {
 return res.json('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);