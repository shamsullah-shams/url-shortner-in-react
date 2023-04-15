const User = require("../models/userModel");
const crypto = require('crypto');
const urlModel = require('../models/urlModel');
const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');


// @@ create new user in the database if not exists
exports.postSigupUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    // @@ any field does not exist
    if (!name || !email || !password) {
        return res.json({ message: "All fields are required" });
    }
    // @@ check if user exist with the same email
    const user = await User.findOne({ email: email });
    if (user) {
        return res.json({ message: "account on this email already exists" });
    }

    // @@ hashing password 
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        // @@ create new user
        const newUser = new User({ name: name, email: email, password: hashPassword });
        await newUser.save();
        // send response
        return res.json({ message: "account created" });
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
}


// @@ sign in user
exports.postSigninUser = async (req, res, next) => {

    const { email, password } = req.body;
    // @@ email or password does not exists 
    if (!email || !password) {
        return res.json({ message: "All fields are required" });
    }

    // @@ try to find user if exists return id of user
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ message: "User on this account Not found" });
        }
        // @@ compare passwords
        try {
            const doMatch = await bcrypt.compare(password, user.password);
            if (doMatch) {
                return res.status(201).json({ usertoken: user._id, message: "you are loged in" });
            } else {
                return res.json({ message: "Password is Wronge" });
            }
        } catch (e) {
            res.status(500).send({
                error: e
            })
        }
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
}


// @@ get urls with related user
exports.getHistory = async (req, res, next) => {
    // @@ get user id from request
    const { usertoken } = req.body;
    if (!usertoken) {
        return res.json({ message: "first sign in" });
    }
    try {
        // @@ find all urls
        const allurls = await urlModel.find({ userId: ObjectId(usertoken) });
        if (allurls.toString() == [].toString()) {
            return res.json({ message: 'No history in the database' });
        }
        // @@ seperate long and short urls and send to the client
        const newAllUrls = allurls.map((item) => {
            return {
                originalUrl: item.originalUrl, shortUrl: item.shortUrl
            }
        });
        return res.send({ allurls: newAllUrls });
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }

}

// @@ delete all urls with the related users
exports.clearHistory = async (req, res, next) => {
    const { usertoken } = req.body;
    try {
        await urlModel.deleteMany({ userId: usertoken });
        return res.status(200);
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
}