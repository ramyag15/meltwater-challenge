const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, 'redacted-files');

module.exports = function redact(req, res) {
  var form = new IncomingForm();
  var readStream;
  var replaceString;
  var stringList;

  form.parse(req, function(err, fields, files) {
    if(err){
      console.log(err);
    }
    replaceString = fields.replaceString;
    console.log('replace string: ', replaceString); 
    stringList = replaceString.split(",");
    for(var i = 0; i < stringList.length; i++) {
      console.log('list item: ' , stringList[i]);
    }
  });

  form.on('file', (field, file) => {
    console.log('file name: ', file.name);
    console.log('file path: ', file.path);
    readStream = fs.createReadStream(file.path);
    var copyFileContents = '', originalFileContents = '';
    readStream.on('data', function (contents) {
      originalFileContents = contents.toString();
      for(var i = 0; i < stringList.length; i++) {
        console.log("item ", i , "=" , stringList[i]);
        copyFileContents = contents.toString().replace(new RegExp(stringList[i], 'g'), 'XXXX');
        contents = copyFileContents.toString();
      }
    });

    readStream.on('end', function () {

      if (originalFileContents != copyFileContents) {
        fs.writeFile(directoryPath + '/_redacted_' + file.name, copyFileContents , function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log('Redaction complete!');
            }
        });
      }
    });
  });
  form.on('end', () => {
    res.json();
  });
};
