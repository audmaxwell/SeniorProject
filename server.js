const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const router = express.Router();
var mysql = require('mysql');
const { response } = require('express');
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
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/new-post', (req,res)=> {
  const subj = req.body.subject
  const sql = `INSERT INTO posts (content) VALUES(?);`
  console.log(subj)
  conn.query(sql, [subj], (err,results,fields) => {
    if (err) {
      console.warn("Error querying database:", err)
      return
    } else {
      console.log('Data inserted successfully!'); 
    }
  })
});
app.post('/create-user', (req, res) => {
  const { username, email, password } = req.body
  const sql = `INSERT INTO users(username, email, password, created)
  VALUES(?, ?, ?, NOW());`
  conn.query(sql, [username, email, password], (err, results, fields) => { 
    if (err) {
      console.warn("Error querying database:", err)
      return
    } else {
      console.log('Data inserted successfully!'); 
    }
  });

  res.end()
})
app.get('/create-user', (req, res) => {
  conn.query("SELECT username,email FROM users;", (err, results, fields) => {
    if(err) {
      console.warn("Error querying database:", err)
      return
    } 
    else{
    res.send(results);
    }
  });
});

app.get('/new-post', (req, res) => {
  conn.query("SELECT * FROM posts;", (err, results, fields) => {
    if(err) {
      console.warn("Error querying database:", err)
      return
    } 
    else{
    res.send(results);
    }
  });
});

app.get('/ping', function (req, res) {
 return res.json('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);