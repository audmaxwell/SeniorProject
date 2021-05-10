const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer');
const app = express();
const router = express.Router();
const helpers = require('./helpers');
var mysql = require('mysql');
const { response } = require('express');
var uniqid = require('uniqid');
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
      cb(null, 'public/uploads');
      console.log(file)
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.post('/uploads', (req, res) => {
  console.log(req)
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('imageupload');
  upload(req, res, function(err) {
      if (req.fileValidationError) {
        console.log("1")
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
        console.log("2")
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        console.log("3")
          return res.send(err);
      }
      else if (err) {
        console.log("4")
          return res.send(err);
      }
      const subj = "/uploads/" + req.file.filename
      console.log(subj)
      return res.json(subj)
      
  });
});
app.post('/new-post', (req,res)=> {
  const sql = `INSERT INTO posts (postID, content, photourl, userID, published) VALUES(?, ?, ?, ?, NOW());`
  const postID = uniqid();

  conn.query(sql, [postID, req.body[0], req.body[1], req.body[2]], (err,results,fields) => {
    if (err) {
      console.warn("Error querying database:", err)
      return
    } else {
      console.log('Data inserted successfully!');
      res.send()
    }
  })
});
app.post('/create-user', (req, res) => {
  const { username, email, password } = req.body
  const id = uniqid()
  const sql = `INSERT INTO users(userID, username, email, password, created)
  VALUES(?, ?, ?, ?, NOW());`
  conn.query(sql, [id, username, email, password], (err, results, fields) => { 
    if (err) {
      console.warn("Error querying database:", err)
      return
    } else {
      console.log('Data inserted successfully!'); 
    }
  });

  res.end()
})

app.get('/users/:id', (req, res) => {
  console.log('params', req.params)

  conn.query('SELECT * FROM users WHERE userID=?', [ req.params.id ], (err, results) => {
    if (err) res.end(err);
    res.send(results[0])
  })
})

app.post('/users/get-user', (req, res) => {
  const { username } = req.body;

  conn.query("SELECT * FROM users WHERE username=?;", [ username ], (err, results) => {
    if (err) {
      res.end()
    } else {
      res.send(results[0])
    }
  })
})

app.post('/users/all-posts', (req, res) => {
  const { userID } = req.body;

  console.log('userID', userID)

  conn.query("SELECT * FROM posts WHERE userID=? ORDER BY published DESC;", [ userID ], (err, results) => {
    if (err) {
      res.end()
    } else {
      console.log('results', results)
      res.send(results)
    }
  })
})

app.post('/users/update-profile-image', (req, res) => {
  const { userID, profileImage } = req.body;

  console.log('update image for', userID, 'to', profileImage)

  conn.query('UPDATE users SET profileImage=? WHERE userID=?;', [profileImage, userID ], () => {
    res.end() 
  })
})

app.get('/create-user', (req, res) => {
  conn.query("SELECT * FROM users;", (err, results, fields) => {
    if(err) {
      console.warn("Error querying database:", err)
      return
    } 
    else{
    res.send(results);
    }
  });
});

app.get('/create-user', (req, res) => {
  console.log(req.body.USERNAME)
  conn.query("SELECT * FROM users;", (err, results, fields) => {
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
  conn.query("SELECT * FROM posts ORDER BY published DESC;", (err, results, fields) => {
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