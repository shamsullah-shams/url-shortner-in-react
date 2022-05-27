const User = require("../models/userModel");
const crypto = require('crypto');
const urlModel = require('../models/urlModel');
const { ObjectId } = require("mongodb");

exports.postSigupUser = async (req , res, next) => {
    const {name , email , password} = req.body;

    if(!name || !email || !password) {
        return res.json({message : "All fields are required"});
    }
    const user = await User.findOne({email : email});
    if(user) {
        return res.json({message : "account on this email already exists"});
    }

    const newUser = new User({name : name , email : email , password : password});
    await newUser.save();
    return res.json({message : "account created"});   
        

}


exports.postSigninUser = async (req , res, next) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email : email});
        if(!user) {
            return res.json({message : "User on this account Not found"});
        }
        if(user.password !== password) {
            return res.json({message : "Password is Wronge"});
        }
        return res.status(201).json({usertoken : user._id , message : "you are loged in"});
    } catch (error) {
        
    }
}


exports.getHistory = async (req, res, next) => {
    const { usertoken } = req.body;
    if(!usertoken) {
        return res.json({message : "first sign in"});
    }
    try {
        const allurls = await urlModel.find({userId : ObjectId(usertoken)});
        if(allurls.toString() == [].toString() ) {
            return res.json({message : 'No history in the database'});
        }
        const newAllUrls = allurls.map((item) => {
                return {
                    originalUrl : item.originalUrl , shortUrl : item.shortUrl
            }
        });
        return res.send({allurls : newAllUrls});
        } catch (error) {       
    }

}


exports.clearHistory = async (req , res, next) => {
    const { usertoken } = req.body;
    try {
        await urlModel.deleteMany({usertoken : usertoken});
        return res.status(200);
    } catch (error) {
        
    }
}