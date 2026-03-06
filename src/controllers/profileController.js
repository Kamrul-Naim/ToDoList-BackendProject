const profileModel = require("../models/profileModel.js");
var jwt = require('jsonwebtoken');


//User Registration
exports.createProfile = (req, res) => {
    let reqBody = req.body;

    profileModel.create(reqBody)
        .then((data) => {
            res.status(200).json({
                status: "success",
                data: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "fail",
                data: err
            });
        });
};


//User Login
exports.userLogin = (req, res) => {
    let reqBody = req.body;

    let username = req.body.UserName;
    let password = req.body.Password;

    profileModel.find({ UserName: username, Password: password })
        .then((data) => {
            if (data.length > 0) {

                //Create auth token
                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: data[0]
                }
                let token = jwt.sign(payload, 'dejavu');

                res.status(200).json({ status: "success", token: token, data: data });
            }
            else {
                res.status(401).json({ status: "Unauthorized" });
            }
        })
        .catch((err) => {
            res.status(400).json({
                status: "fail",
                data: err
            });
        });
};



//Read Profile
exports.selectProfile = (req, res) => {
    let username = req.headers.UserName;

    profileModel.find({ UserName: username })
        .then((data) => {
            res.status(200).json({
                status: "success",
                data: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "fail",
                data: err
            });
        });
};



//Update Profile
exports.updateProfile = (req, res) => {
    let username = req.headers.UserName;
    let reqBody = req.body;

    profileModel.updateOne({ UserName: username }, { $set: reqBody })
        .then((data) => {
            res.status(200).json({
                status: "success",
                data: data
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "fail",
                data: err
            });
        });
};