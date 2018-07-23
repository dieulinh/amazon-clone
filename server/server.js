const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect database
mongoose.connect(config.database, error => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log('Connected to the database');
  }
});
app.use(morgan('dev'));
const port = 8080;
app.get('/', (req, res) => {
  res.status(200);
  res.send('You are here');
});
app.listen(port, error => {
  console.log(`Server running on port ${port}`);
})
