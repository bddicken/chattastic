require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
var cors = require('cors')

const app = express()
app.use(cors())
app.set('json spaces', 2)

const port = process.env.PORT || 3100

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.query('show tables', function (err, results, fields) {
  console.log(results) // results contains rows returned by server
  console.log(fields) // fields contains extra metadata about results, if available
})

app.get('/messages/:room', (req, res) => { 
  const {room} = req.params;
  connection.query('SELECT * FROM message WHERE room = ?', [room], (err, results) => {
    res.json(results);
  });
});

/* For getting *recent* messages */
app.get('/messages/:room/:id', (req, res) => { 
  const {room, id} = req.params;
  connection.query('SELECT * FROM message WHERE room = ? AND id > ?', [room, id], (err, results) => {
    res.json(results);
  });
});

/* Send a message to the DB */
app.get('/send/:alias/:room/:text', (req, res) => { 
  const {alias, room, text} = req.params;
  connection.query('INSERT INTO message (alias, room, text) VALUES (?, ?, ?)', [alias, room, text], (err, results) => {
    if (err) res.json({'status':'fail'});
    else res.json({'status':'success'});
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//connection.end()

