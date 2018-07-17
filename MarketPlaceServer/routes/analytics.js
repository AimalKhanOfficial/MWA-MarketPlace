var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
var connection = require('../dbconnection/dbconfig');
const { from } = require('rxjs');
const { filter } = require('rxjs/operators');
var utilities = require('../utilities/HelperUtilities');
var jwt = require('jsonwebtoken');

//We need this middle ware to check for authorization token (Aimal)
router.use('/protected', (req, res, next) => {
    var token = null;
    var bits = req.headers.authorization.split(' ');

    if (bits.length == 2) {
        var scheme = bits[0];
        var credentials = bits[1];
        if (/^Bearer$/i.test(scheme)) {
            token = credentials;
            jwt.verify(token, '@ccc%^', function (err, decoded) {
                if (err) res.status(200).json("Invalid Token");
                next();
            });
        }
    }
    else {
        res.status(401).json("Invalid Token format");
    }
});

router.get("/userVerificationsChart", (req, res, next) => {
    var users = connection.User.aggregate([{ $group: { _id: "$isVerified", count: { $sum: 1 } } }], function (err, users) {
        var userVerificationsChartData = [];
        if (users != undefined) {
            var verifiedUsers = 0;
            var unVerifiedUsers = 0;
            userVerificationsChartData.push({
                "name": "Total Users",
                "y": users.length
            });
            from(users)
                .subscribe(data => {
                    if (data._id == 1) {
                        verifiedUsers++;
                    }
                    else {
                        unVerifiedUsers++;
                    }
                });

            userVerificationsChartData.push({
                "name": "Verified",
                "y": verifiedUsers
            });

            userVerificationsChartData.push({
                "name": "Not verified",
                "y": unVerifiedUsers
            });
        }
        res.json(userVerificationsChartData);
    });
});

module.exports = router;