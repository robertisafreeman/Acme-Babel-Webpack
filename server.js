const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/assets', express.static(path.join(__dirname, 'assets')))

db.syncAndSeed()
  .then(()=> app.listen(port, ()=> console.log(`you are litening to port ${port}`)))
