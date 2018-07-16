var express = require('express');
var router = express.Router();
var jsonParser = express.json();
var connection = require('../dbconnection/dbconfig');
var firebase = require("firebase");


router.get('/file-upload', (req, res, next) => {
  var posts = connection.Post.find({}, function (err, list) {
    if (err) throw err;
    res.json(downloadFile());
    res.end();
  })
})

router.route('/file-upload')
  .post(jsonParser, function (req, res, next) {

    console.log(req.body);

    uploadFile(req.body, res);

  });


function uploadFile(pObj, pRes) {

  console.log('****************** ADDDDD *****************')

  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    //storageBucket: process.env.storageBucket,
    projectId: process.env.projectId,
    messagingSenderId: process.env.messagingSenderId
  };
  firebase.initializeApp(config);


  //////////////////////////////////////////////////////

  // File or Blob named mountains.jpg
  var file = "";

  // Create the file metadata
  var metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("unauthorized")
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log("canceled")
          break;
        case 'storage/unknown':
          console.log("unknown")
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
      });
    });

}

function downloadFile() {

  // Create a reference to the file we want to download
  var starsRef = storageRef.child('images/stars.jpg');
  // Get the download URL
  starsRef.getDownloadURL().then(function (url) {
    // Insert url into an <img> tag to "download"
  }).catch(function (error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}
module.exports = router;