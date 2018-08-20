const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const cors = require('cors');
const app = express();

const AccountRoutes = require('./routers/account');
const CategoryRoutes = require('./routers/main');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/accounts', AccountRoutes);
app.use('/api', CategoryRoutes);

// Connect database
mongoose.connect(config.database, { useNewUrlParser: true } , error => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log('Connected to the database');
  }
});
app.use(morgan('dev'));
app.use(cors());
const port = 8080;
app.get('/', (req, res) => {
  res.status(200);
  res.send('You are here');
});
app.listen(port, error => {
  console.log(`Server running on port ${port}`);
})
