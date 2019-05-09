const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, 'redacted-files');

module.exports = function download(req, res) {
  fs.readdir(directoryPath, function (err, files) {
    console.log(directoryPath);
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    res.download(directoryPath + '/_redacted_test2.txt');
    //listing all files using forEach
    /*files.forEach(function (file) {
      console.log(directoryPath + '/' + file);
      res.download(directoryPath + '/' + file);
    });*/
  });
};