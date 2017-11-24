const express = require('express');
const path = require('path');
const morgan = require('morgan');
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  { DB } = require('./config/DB'),
  itemRoutes = require('./routes/item');

mongoose.Promise = global.Promise;
mongoose.connect(DB, { useMongoClient: true})
  .then(() => console.log('Db is conencted'))
  .catch(err => console.error(err));

const app = express();
var port = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/items', itemRoutes);

// static file
app.use(express.static(path.join(__dirname, 'public')));

// start the server
var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
