const todoListModel=require("../models/todoListModel.js");
const mongoose = require("mongoose");


exports.createList = (req, res) => {
    let reqBody = req.body;

    let username=req.headers.UserName;
    let subject=reqBody.Subject;
    let description=reqBody.Description;
    let status="New";
    let createDate=Date.now();
    let updateDate=Date.now();

    let postBody={
        UserName:username,
        Subject:subject,
        Description:description,
        Status:status,
        CreateDate:createDate,
        UpdateDate:updateDate
    }

    todoListModel.create(postBody)
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



//Select List
exports.selectList = (req, res) => {
    let username = req.headers.UserName;

    todoListModel.find({ UserName: username })
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


//Update List
exports.updateList = (req, res) => {
    let reqBody = req.body;

    let Subject=reqBody.Subject;
    let Description=reqBody.Description;
    let _id=reqBody._id;
    let UpdateDate=Date.now();


    const postBody={
        Subject:Subject,
        Description:Description,
        UpdateDate:UpdateDate
    }

    todoListModel.updateOne({ _id:_id}, { $set: postBody })
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


//Update Status
exports.updateStatus = (req, res) => {
    let reqBody = req.body;

    let status=reqBody.Status;
    let _id=reqBody._id;
    let UpdateDate=Date.now();


    const postBody={
        Status:status,
        UpdateDate:UpdateDate
    }

    todoListModel.updateOne({ _id:_id}, { $set: postBody })
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



//Remove a Task
exports.removeTask = (req, res) => {
    let reqBody = req.body;

    let _id=reqBody._id;


    todoListModel.deleteOne({ _id:_id})
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



//Select By Status
exports.selectByStatus = (req, res) => {
    let username = req.headers.UserName;
    let reqBody=req.body;
    let status=reqBody.Status;

    todoListModel.find({ UserName: username,Status:status})
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



//Select By Date
exports.selectByDate = (req, res) => {
    let username = req.headers.UserName;
    let reqBody=req.body;
    let from=reqBody.from;
    let to=reqBody.to;

    todoListModel.find({ UserName: username,CreateDate:{$gte:new Date(from),$lte:new Date(to)}})
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
