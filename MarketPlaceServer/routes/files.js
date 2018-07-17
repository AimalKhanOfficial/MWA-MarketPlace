var express = require('express');
var router = express.Router();
var jsonParser = express.json();
var connection = require('../dbconnection/dbconfig');
const storage = require('@google-cloud/storage');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

//---Upload----//
var myStorage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: myStorage });
//////


router.get('/file-upload', (req, res, next) => {
  var posts = connection.Post.find({}, function (err, list) {
    if (err) throw err;
    res.json(downloadFile());
    res.end();
  })
})

router.route('/file-upload')
  .post(upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    uploadFile(req.files, res);
  });

function uploadFile(files, res) {


  var gcs = storage({
    projectId: 'mwamp-cffcf',
    keyFilename: 'uploads/congfig/mwamp-e9de3dbb063a.json'
  });

  // Reference an existing bucket.
  var bucket = gcs.bucket('mwamp-cffcf.appspot.com');

 
  for (let i = 0; i < files.length; i++) {

    // Upload a local file to a new file to be created in your bucket.
    bucket.upload('uploads/'+files.originalname, function (err, file) {
      if (!err) {
        if (i == files.length - 1) {
          console.log("Upload Done")
          res.json({ status: 1 })
        }
      }
      else {
        console.log(err)
        console.log("Upload Fail")
        res.json({ "status": 0 })

      }
    });

  }



}

function downloadFile() {


  // // Download a file from your bucket.
  // bucket.file('giraffe.jpg').download({
  //   destination: '/photos/zoo/giraffe.jpg'
  // }, function(err) {});

  // // Streams are also supported for reading and writing files.
  // var remoteReadStream = bucket.file('giraffe.jpg').createReadStream();
  // var localWriteStream = fs.createWriteStream('/photos/zoo/giraffe.jpg');
  // remoteReadStream.pipe(localWriteStream);

  // var localReadStream = fs.createReadStream('/photos/zoo/zebra.jpg');
  // var remoteWriteStream = bucket.file('zebra.jpg').createWriteStream();
  // localReadStream.pipe(remoteWriteStream);
}
module.exports = router;