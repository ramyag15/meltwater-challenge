const express = require('express');
const redact = require('./redact');
const download = require('./download');
const cors = require('cors');

const server = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.get('/download', download);

server.post('/redact', redact);

server.listen(3000, () => {
  console.log('Server started!');
});
