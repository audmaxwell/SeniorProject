const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer');
const app = express();
const router = express.Router();
const helpers = require('./helpers');
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
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.post('/uploads', (req, res) => {
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('imageupload');

  upload(req, res, function(err) {
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }
      const subj = req.file
      console.log(subj)
      const sql = `INSERT INTO posts (photo) VALUES(?);`
      conn.query(sql, [subj], (err,results,fields) => {
        if (err) {
          console.warn("Error querying database:", err)
          return
        } else {
          console.log('Data inserted successfully!'); 
        }
      })
    
      res.send("amen");
  });
});
app.post('/new-post', (req,res)=> {
  const subj = req.body.subject
  const sql = `INSERT INTO posts (content) VALUES(?);`
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