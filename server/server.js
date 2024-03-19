require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
var cors = require('cors')

const app = express()
app.use(cors())
app.set('json spaces', 2)

const port = process.env.PORT || 3100

const connection = mysql.createConnection(process.env.DATABASE_URL)
/*
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  timezone: 'mst'
});
*/

/* Get rooms for search */
app.get('/search/:term', (req, res) => { 
  const {term} = req.params;
  connection.query('SELECT DISTINCT room FROM message WHERE MATCH(text) AGAINST(?) LIMIT 5', [term], (err, results) => {
    res.json(results);
  });
});

/* Get all messages for a given chat topic */
app.get('/messages/:room', (req, res) => { 
  const {room} = req.params;
  connection.query('SELECT * FROM (SELECT * FROM message WHERE room = ? ORDER BY created_at DESC LIMIT 200) AS x ORDER BY created_at ASC', [room], (err, results) => {
    res.json(results);
  });
});

/* For getting *recent* messages */
app.get('/messages/:room/:id', (req, res) => { 
  const {room, id} = req.params;
  connection.query('SELECT * FROM message WHERE room = ? AND FTS_DOC_ID > ?', [room, id], (err, results) => {
    res.json(results);
  });
});

/* Send a message to the DB */
app.get('/send/:room/:alias/:text', (req, res) => { 
  const {alias, room, text} = req.params;
  connection.query('INSERT INTO message (alias, room, text) VALUES (?, ?, ?)', [alias, room, text], (err, results) => {
    console.log('insert!');
    if (err) res.json({'status':'fail'});
    else res.json({'status':'success'});
  });
});

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}`)
})

//connection.end()
