const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const router = express.Router();
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
app.use(express.static(path.join(__dirname, 'build')));
router.post('create-user', (req, res) => {
  const { email, username, password } = req.body;
  console.log(email,username,password)
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